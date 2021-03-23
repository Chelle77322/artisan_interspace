//Defines the routes to be used for user and artisan

const router = require('express').Router();
const userRoutes = require ('./userRoutes');
const artisanRoutes = require('./artisanRoutes');
const artCommentRoutes = require ('./artCommentRoutes');


router.use('/users', userRoutes);
router.use('/artisans', artisanRoutes);
router.user ('/artComment', artCommentRoutes);

module.exports = router;
