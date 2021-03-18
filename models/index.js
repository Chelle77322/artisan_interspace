const user = require('./user');
const artisan = require('./artisan');

user.hasMany(artisan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

artisan.belongsTo(User,{
    foreignKey: 'user_id'
});
module.exports = {user, artisan};