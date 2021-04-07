const {Model, DataTypes} = require ('sequelize');
const sequelize = require ('../config/connection');

class ArtComment extends Model {}

ArtComment.init(
    {
    id:{

        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    comment_text:{
        type: DataTypes.TEXT,
        allowNull: false,
        },
        date_created:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
       
    user_id:{
        type:DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    artisan_id: {
        type: DataTypes.INTEGER,
       references:{
            model: 'artisan',
            key: 'id',
        },
    },
    },
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'art_comment'
});
console.log(ArtComment);
module.exports = ArtComment;