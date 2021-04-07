const User = require('./user');
const Artisan = require('./artisan');
const ArtComment = require('./art_comment');

User.hasMany(Artisan, {
    foreignKey: 'user_id',
});

Artisan.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: "CASCADE"   
});

ArtComment.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: "CASCADE",
   
});

ArtComment.belongsTo(Artisan,{
foreignKey: 'artisan_id',
onDelete: 'CASCADE',
});

User.hasMany(ArtComment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Artisan.hasMany(ArtComment, {
    foreignKey: 'artisan_id',
    onDelete: 'CASCADE'
})
module.exports = {User, Artisan, ArtComment};