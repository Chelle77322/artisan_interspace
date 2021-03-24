//Defines the routes to be used for User and Artisan and ArtComment models

const router = require('express').Router();
const userRoutes = require ('./userRoutes');
const artisanRoutes = require('./artisanRoutes');
const artCommentRoutes = require ('./artCommentRoutes');


router.use('/users', userRoutes);
router.use('/artisans', artisanRoutes);
router.use ('/art_comment', artCommentRoutes);

console.log(userRoutes);
console.log(artisanRoutes);
console.log(artCommentRoutes);
console.log(router);
module.exports = router;
