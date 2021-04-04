const {Model, DataTypes} = require('sequelize');
const sequelize = require ('../config/connection');

class Artisan extends Model {}

Artisan.init(
    {
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image:{
            type: DataTypes.STRING,
            data: DataTypes.BLOB("long"),
         },
      
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        description:
        {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_created:
        {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    
    user_id: 
    {
        type: DataTypes.INTEGER,
        references: 
        {model: 'user', key: 'id',},
    },
},
{
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'artisan',
});
module.exports = Artisan;