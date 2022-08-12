const Sequelize = require('sequelize');
const db = new Sequelize('test','phpmyadmin','',{
    host: 'localhost',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    }
})

const Schema = db.define('image',{
    type:{
        type:Sequelize.STRING,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING
    },
    data:{
        type:Sequelize.BLOB('long')
    }
})

Schema.sync({ force: false }).then(()=>{
    console.log(`User Table created`)
})

module.exports = Schema