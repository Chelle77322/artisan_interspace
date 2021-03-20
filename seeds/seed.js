const sequelize = require('../config/connection');
const { user, artisan} = require ('../models');

const userData = require('./userData.json');
const artisanData = require('./artisanData.json');

const seedDatabase = async () => {
    await sequelize.sync ({force: true});

const users = await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
for (const artisan of artisanData){
    await artisan.create({
        ...artisan,
        user_id: users[Math.floor(Math.randon())* users.length].id,
    });
}
process.exit(0);
};
seedDatabase();