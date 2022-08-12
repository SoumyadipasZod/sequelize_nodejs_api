const express = require('express');
const Router = express.Router();
const UserController =require('../controller/userController');
const multer = require('multer');

// Router.use(express.static((__dirname,'../Images')));
// var Storage = multer.diskStorage({
//     destination:"../Images",
//     filename:(req,file,cb)=>{
//             cb(null,file.originalname)
//              }
// })

// var upload = multer({storage:Storage}).single('file')

Router.get('/',UserController.index)
Router.get('/form',UserController.form)
Router.post('/form',UserController.addform)
Router.get('/edit/:id',UserController.edit)
Router.post('/update',UserController.update)
Router.get('/delete/:id',UserController.delete)
// Router.post('/update/:id',UserController.update)
module.exports = Router;