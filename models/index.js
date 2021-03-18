const User = require('./User');
const Artisan = require('./Artisan');

User.hasMany(Artisan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Artisan.belongsTo(User,{
    foreignKey: 'user_id'
});
module.exports = {User, Artisan};