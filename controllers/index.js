const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const artBoard = require('./artboard.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('./artboard', artBoard);

router.use((request, result)=> {
    result.status(404).end();

});

module.exports = router;