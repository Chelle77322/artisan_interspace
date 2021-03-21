const sequelize = require('../config/connection');
const { User, Artisan} = require ('../models/index');
const userData = require('./userData.json');
const artisanData = require('./artisanData.json');


const seedDatabase = async () => {
    await sequelize.sync ({force: true});

const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
for (const artisan of artisanData) {
    await Artisan.create({
      ...Artisan,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    
    });
    console.log(users);
  }

  process.exit(0);
};


seedDatabase();