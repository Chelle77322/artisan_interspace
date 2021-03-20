const Sequelize = require('sequelize');

require('dotenv').config({path: __dirname +`/../env`});
require('config-json');

let sequelize;
if (process.env.JAWSDB_URL){
    sequelize =  new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(//Dialect error
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD, 
      process.env.DB_HOST,
      process.env.DIALECT,
        
    {
        host:process.env.DB_HOST,
        dialect: 'mysql',//Dialect Error
        port: process.env.PORT
      });
  }
    module.exports = sequelize;
    console.log(sequelize);
  
    