const express = require('express');
const UserModel = require('../models/User')
const multer = require('multer');
const path = require('path');

exports.index = (req,res) => {
    UserModel.findAndCountAll({where:{isDelete:0},limit:null,offset:null})
    .then((result) => {
        let output = result.rows
        console.log(output)
        // res.render('index',{viewdata:output})  cc
        res.status(200).json({
            status: 'success',
            result: output,
            message: 'data fetch successfully'
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'failed',
            result: err,
            message:'failed'
        })
    })
    
}

exports.form = (req, res) => {
    res.status(200).json({
        status: 'success',
        // result: result,
        message: 'post data with post message'
    })
}

exports.addform = (req, res) => {
    console.log('reqqqqqqqqqqqqqq',req.file)
    let info ={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        image:req.file.filename
    }
    UserModel.create(info)
    .then((result) => {
        res.status(200).json({
            status: 'success',
            result: result,
            message: 'data Added successfully'
        })
    })
    .catch((err) => {
        res.status(404).json({
            status:'failed',
            result: err,
            message:'data added failed'
        })
    })
}

exports.edit = (req, res) =>{
    let id = req.params.id
    UserModel.findByPk(id)
    .then((result) => {
        res.status(200).json({
            status: 'success',
            result:result,
            message: 'edit the data'
        })
    })
    .catch((err) => {
        res.status(404).json({
            status:'failed',
            result:err,
            message:'something went wrong'
        })
    })
}

exports.update = (req,res) =>{
    let id = req.params.id
    // let {id,firstname, lastname} = req.body

    image = req.file.filename

    UserModel.findByPk(id)
    .then((result) => {
        console.log('xyz',result);
        result.firstname = firstname
        result.lastname = lastname
        result.image = image
        return result.save()
        .then((result)=>{
            console.log(result)
            res.status(200).json({
                status: 'success',
                result:result,
                message: 'updated the data'
            })
        })
        .catch((err)=>{
            res.status(404).json({
                status:'failed',
                result: err,
                message:'data Update failed'
            })
        })
    })

    UserModel.findByPk(id).then((result)=>{
        res.status(200).json({
            status: 'success',
            result:result,
            message: 'updated the data'
        })
    })
}

exports.delete = (req,res) =>{
    let id = req.params.id
    UserModel.update({isDelete:1},{where:{id:id}})
    .then((result) =>{
        res.status(200).json({
            status: 'success',
            result:result,
            message: 'delete the data'
        })
    })
    .catch((err) =>{
        res.status(404).json({
            status:'failed',
            result: err,
            message:'delete Update failed'
        })
    })
}
