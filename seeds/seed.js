const sequelize = require('../config/connection');
const { User, Artisan, ArtComment} = require ('../models/index');
const userData = require('./userData.json');
const artisanData = require('./artisanData.json');
const artCommentData = require('./artCommentData.json');


const seedDatabase = async () => {
    await sequelize.sync ({force: true});

const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
for (const artBoard of artBoard) {
    await Artisan.create({
      ...Artisan,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    
    });
    
  }
  for (const artcommentData of artcommentData) {
    await ArtComment.create({
      ...ArtComment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    
    });
   
  }


  process.exit(0);
};


seedDatabase();