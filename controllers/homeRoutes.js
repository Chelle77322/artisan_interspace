const router = require ('express').Router();
const {Artisan, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (request, result)=> {
    try {
        //Get everything and join it with the user session data
        const artisanData = await Artisan.findAll({
            include:[
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
//Serialize data here
const artisans = artisanData.map((artisan)=> artisan.get({plain: true}));
//Put the serialized data and session flag into the template to be used for the homepage
result.render('homepage', {
    artisans,
    logged_in: request.session.logged_in
});
    } catch (error){
        result.status(500).json(error);
    }
});

//gets artisan post based on id
router.get('/artisan/:id', async (request, result) => {
    try {
        const artisanData = await Artisan.findByPk(request.params.id,
            {
              include:[
                  {
                      model: User,
                      attributes: ['name'],
                  },
              ],  
            });
    const artisan = artisanData.get({ plain: true});
    result.render('artisan', {
        ...artisan,
        logged_in: request.session.logged_in
    });
    } catch ( error)
    { result.status(500).json(error); }
});
 // withAUTH is using middleware to prevent access to the route from client
 router.get('/profile', withAuth, async (request, result) => {
try {
    //Locates logged in user based on session ID
    const userData = await User.findByPk(request.session.user_id,
    {
        attributes: {exclude: ['password'] },
        include: [{model: Artisan}],
    });
    const user = userData.get({plain: true});
    result.render('profile', {
        ...user,
        logged_in: true
    });
} catch (error) {
    result.status(500).json(error);
}
});
router.get('/login', (request, result)=> {
    if (request.session.logged_in){
        result.redirect('/profile');
        return;
    }
    result.render('login');
});
module.exports = router;