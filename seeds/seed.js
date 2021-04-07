const userData = require('./userData');
const artboard = require('./artisanData');
const artcommentData = require('./artCommentData');const seqeulize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync ({force: true});
    await userData();
    await artboard();
    await artcommentData();
//Artist Seeding
//await User.bulkCreate(userData, {
  //  individualHooks: true,
    //returning: true,
//});
//Art Post Seeding

  //  await Artisan.bulkCreate(artboard, {
    //  individualHooks: true,
      //returning: true,
    //});
  //Art Comment Seeding  
    //await ArtComment.bulkCreate(artcommentData,{
      //individualHooks: true,
      //returning: true,
     
     //});
     process.exit(0);
    
  };
  
seedDatabase();