const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const ejs = require('ejs');
const redis = require('redis');
const app = express();



app.set('view engine','ejs')
app.set('views','views')
app.use(bodyParser.urlencoded({ extended:true }));


app.use(express.static(path.join(__dirname,'Images')))

//sir please use your own mysql databse name and username and password
const db = new Sequelize('test','phpmyadmin','',{
    host: 'localhost',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
})

db.authenticate()
.then(()=>{
    console.log(`database connected`)
})
.catch(err =>console.log(err))


// fileupload


// step-3 filestorage
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


//stape4 file type
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }    
}

// // step-5
app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))


//
    let redisClient = null;
    redisClient.on()
//

const port = 2504;
app.listen(port,console.log(`server running at: http://localhost:${port}`));

const UserRouter = require('./routes/userRoutes')
app.use(UserRouter)
