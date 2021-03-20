const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require ('../config/connection.js');

class user extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
user.init(
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
    email:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{isEmail: true,},
    },
    password: 
    {
     type: DataTypes.STRING,
     allowNull: false,
     validate:{len: [8],},   
    },
},
{
    hooks: {
        beforeCreate: async (newuserData) => {
            newuserData.password = await bcrypt.hash(newuserData.password, 10);
            return newuserData;
        },
        beforeUpdate: async (updateduserData) => {
            updateduserData.password = await bcrypt.hash(updateduserData.password, 10);
            return updateduserData;
        },
       
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});
module.exports = user;