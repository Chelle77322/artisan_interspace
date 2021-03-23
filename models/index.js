const User = require('./user');
const Artisan = require('./artisan');
const ArtComment = require('./art_comment');

User.hasMany(Artisan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Artisan.belongsTo(User,{
    foreignKey: 'user_id'
});
ArtComment.belongsTo(Artisan,{
    foreignKey: 'artisan_id',
    onDelete: 'CASCADE'
})
module.exports = {User, Artisan, ArtComment};