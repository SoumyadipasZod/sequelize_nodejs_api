const express = require('express');
const Router = express.Router();
const UserController =require('../controller/userController');
const userAuth = require('../middlewares/userAuth');
const verify = require('../middlewares/verify')


Router.get('/',[userAuth.authJwt],UserController.index)
Router.get('/form',[userAuth.authJwt],UserController.form)
Router.post('/form',[userAuth.authJwt],UserController.addform)
Router.get('/update/:id',[userAuth.authJwt],UserController.edit)
Router.post('/update/:id',[userAuth.authJwt],UserController.update)
Router.get('/delete/:id',[userAuth.authJwt],UserController.delete)
Router.post('/registration',[verify.verifyUser],UserController.registration)
Router.post('/login',UserController.login)
Router.get('/logout',[userAuth.authJwt],UserController.logout)


Router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
module.exports = Router;