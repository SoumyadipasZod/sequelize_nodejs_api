const Sequelize = require('sequelize');

//sir please use your own mysql databse name and username and password
//
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

const Schema = db.define('reg',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
})

Schema.sync({ force: false }).then(()=>{
    console.log(`Registration Table created`)
})

module.exports = Schema