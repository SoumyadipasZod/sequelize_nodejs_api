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

const Schema = db.define('user',{
    firstname:{
        type:Sequelize.STRING,
        allowNull: false
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
    },
    isDelete:{
        type:Sequelize.BOOLEAN,
        defaultValue:0
    }
})

Schema.sync({ force: false }).then(()=>{
    console.log(`User Table created`)
})

module.exports = Schema