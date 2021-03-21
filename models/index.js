const User = require('./user');
const Artisan = require('./artisan');

User.hasMany(Artisan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Artisan.belongsTo(User,{
    foreignKey: 'user_id'
});
module.exports = {User, Artisan};