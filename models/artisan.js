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
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        description:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created:
        {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        needed_funding: 
        {
            type: DataTypes.FLOAT,
            allowNull: false,
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
console.log(sequelize);
module.exports = Artisan;