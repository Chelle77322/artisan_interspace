const {Model, DataTypes} = require ('sequelize');
const sequelize = require ('../config/connection');

class ArtComment extends Model {}

ArtComment.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text:{
        type: DataTypes.STRING,
        validate:{
            len:[3]
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    artisan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'artisan',
            key: 'id'
        }
    }
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'art_comment'
});
module.exports = ArtComment;