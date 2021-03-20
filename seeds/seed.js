const sequelize = require('../config/connection');
const { user, artisan} = require ('../models');

const userData = require('./userData.json');
const artisanData = require('./artisanData.json');
console.log(artisanData);

const seedDatabase = async () => {
    await sequelize.sync ({force: true});

const users = await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
for (const Artisan of artisanData) {
    await artisan.create({
      ...Artisan,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};


seedDatabase();