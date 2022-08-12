const express = require('express');
const UserModel = require('../models/User');
const RegModel = require('../models/Reg');
const multer = require('multer');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.index = (req,res) => {
    UserModel.findAndCountAll({where:{isDelete:0},limit:null,offset:null})
    .then((result) => {
        let output = result.rows
        console.log(output)
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
    let {firstname, lastname} = req.body


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


exports.registration = async(req,res) =>{
    const salt = await bcrypt.genSalt(10);
    var usr = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : await bcrypt.hash(req.body.password, salt)
      };
      RegModel.create(usr)
      .then((result)=>{
        res.status(200).json({
            status: 'success',
            result:result,
            message: 'registration the data'
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

exports.login = async(req, res) =>{
    const user = await RegModel.findOne({ where : {email : req.body.email }});
    if(user){
        const password_valid = await bcrypt.compare(req.body.password,user.password);
        if(password_valid){
            token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },'soumyadip',{ expiresIn: "30m" });
            res.status(200).json({ token : token });
        } else {
          res.status(400).json({ error : "Password Incorrect" });
        }
      
      }else{
        res.status(404).json({ error : "User does not exist" });
      }
}


exports.logout = (req,res) =>{
    // jwt.destroy(token)
    // .then((res)=>{
    //     res.status(400).json({ meaasge : "Logout successfully" })
    // })
    // res.status(200).send({ auth: false, token: null });
    req.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      ).destroy().then((res)=>{
        // res.status(200).send({ auth: false, token: null });
      })
}
