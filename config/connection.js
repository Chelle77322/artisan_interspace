const Sequelize = require('sequelize');
const db = {};
require('dotenv').config();
require('config-json');
let sequelize;
if (process.env.JAWSDB_URL){
    sequelize =  new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD, 
     
    {
        host:DB_HOST,
        dialect: DIALECT,
        dialectOptions: {
          decimalNumbers: true,
        },
        port: PORT
      });
  }
    module.exports = sequelize;