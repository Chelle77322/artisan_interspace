//Defines the routes to be used for user and artisan

const router = require('express').Router();
const userRoutes = require ('./userRoutes');
const artisanRoutes = require('./artisanRoutes');

console.log(artisanRoutes);
console.log(userRoutes);
console.log(router);
router.use('/users', userRoutes);
router.use('/artisans', artisanRoutes);

module.exports = router;
