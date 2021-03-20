const user = require('./user');
const artisan = require('./artisan');

user.hasMany(artisan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

artisan.belongsTo(user,{
    foreignKey: 'user_id'
});
module.exports = {user, artisan};