const router = require ('express').Router();

const {Artisan, User, ArtComment} = require('../models');

const WithAuth = require('../utils/auth');

router.get('/', (request, result) => {
    try {
        result.render('homepage');
        result.status(200);
    } catch (error) {
        result.status(500).json(error);
    }
});
//This is where you sign up as an artist route
router.get('/signup', async ( request, result) =>{
    try{
        const userData = await User.findAll({
            attributes:['id', 'name', 'email', 'password']
        });
        result.render('signup')
    }catch (error){
        result.status(500).json(error)
    }

});

router.get ('/artisan/:id', (request, result) => {
Artisan.findAll({
   attributes:[
      'id',
        'name',
        'description',
        'date_created',
        'user_id'
    ],
    include:[{
       model: ArtComment,
        attributes: ['id', 'comment_text', 'user_id'],
        include: { 
           model: User,
            attributes: ['name']
        }
    },
{
   model: User,
    attribute: ['name']
}

]

}).then(artboardData => {
    const artboard = artboardData.map(artboard => artboard.get({plain: true}));
    result.render('artboard', {artboard, loggedIn: request.session.loggedIn });
}) .catch(error => {
  console.log(error);
    result.status(500).json(error);
});
});
//Gets information after login
router.get('/login', (request, result) => {
   if (request.session.loggedIn){
       result.redirect('/artboard');
        return;
    }
    result.render('login');
    });
//Gets artboard associated with user id after login
router.get ('/artboard/:id', (request, result)=> {
  artboard.findOne({
        where: {
            id: request.params.id
        },
        attributes: [
           'id',
            'name',
            'description',
            'date_created',
            'user_id'
        ],
        include:[{
            model: ArtComment,
            attributes: ['id', 'artisan_id', 'user_id', 'date_created'],
            include: { 
                model: User,
                attributes: ['name']
            }
        },
    {
        model: User,
        attribute: ['name']
    }
    ]
    }).then (artboardData => {
        if (!artboardData){
            result.status(404).json({message: 'No artboard was found with this id'});
           return
        }
        const artboard = artboardData.get({plain: true});
        console.log(artboard);
        result.render('artboard', {artboard, loggedIn: request.session.loggedIn });

    }).catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
router.get('/artboard_comments', (request, result)=>{
    Post.findOne({
       where: {
            id: request.body.params.id
        },
        attributes: [
            'id',
            'name',
            'description',
            'date_created'
        ],
        include: [{
               model: ArtComment,
              attributes: ['id', 'comment_text', 'art_id', 'user_id', 'date_created'],
                include: {
                   model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    .then(artboardData => {
        if (!artboardData) {
          result.status(404).json({ message: 'No post found with this id' });
          return;
        }
        const artboard = artboardData.get({ plain: true });
        console.log(artboard);

        result.render('homepage', { artboard, loggedIn: request.session.loggedIn });
    }).catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
//console.log(router);
module.exports = router;




