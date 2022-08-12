const express = require('express');
const Router = express.Router();
const UserController =require('../controller/userController');
const multer = require('multer');
const userAuth = require('../middlewares/userAuth');
const verify = require('../middlewares/verify')


Router.get('/',[userAuth.authJwt],UserController.index)
Router.get('/form',UserController.form)
Router.post('/form',UserController.addform)
Router.get('/edit/:id',UserController.edit)
Router.post('/update/:id',UserController.update)
Router.get('/delete/:id',UserController.delete)
Router.post('/registration',[verify.verifyUser],UserController.registration)
Router.post('/login',UserController.login)
Router.get('/me',UserController.me)
// Router.post('/update/:id',UserController.update)

module.exports = Router;