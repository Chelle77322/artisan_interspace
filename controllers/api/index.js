//Defines the routes to be used for User and Artisan and ArtComment models

const router = require('express').Router();
const userRoutes = require ('./userRoutes');
const artBoard = require('./artboard');
const artCommentRoutes = require ('./artCommentRoutes');


router.use('/users', userRoutes);
router.use('/artboard', artBoard);
router.use ('/art_comment', artCommentRoutes);


module.exports = router;
