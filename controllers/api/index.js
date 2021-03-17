const router = require('express').Router();
const userRoutes = require ('./userRoutes');
const artisanRoutes = require('./artisanRoutes');

router.use('/users', userRoutes);
router.use('/artisans', artisanRoutes);

module.exports = router;
