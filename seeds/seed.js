const { User, Artisan, ArtComment} = require ('../models/index');
const userData = require('./userData.json');
const artboard = require('./artisanData.json');
const artcommentData = require('./artCommentData.json');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
    //await sequelize.sync ({force: true});
    //await userData();
    //await artboard();
    //await artcommentData();
//Artist Seeding
await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
//Art Post Seeding
await Artisan.bulkCreate(artboard, {
      individualHooks: true,
      returning: true,
    });
  //Art Comment Seeding  
    await ArtComment.bulkCreate(artcommentData,{
      individualHooks: true,
      returning: true,
     
     });
     process.exit(0);
    
  };
  
seedDatabase();