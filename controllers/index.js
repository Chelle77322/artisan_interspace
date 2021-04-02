const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//router.use((request, result)=> {
   // result.status(404).end();

//});



module.exports = router;