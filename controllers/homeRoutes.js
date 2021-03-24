const sequelize = require('../config/connection')
const {Artisan, User, ArtComment} = require('../models');
const router = require ('express').Router();
const WithAuth = require('../utils/auth');

router.get ('/', (request, result) => {
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
            attributes: ['user']
        }
    },
{
    model: User,
    attribute: ['user']
}

]

}).then(artboardData => {
    const artboard = artboardData.map(artboard => artboard.get({
       plain: true}));
       result.render('homepage', {artboard, loggedIn: request.session.loggedIn });
})
.catch(error =>{
    console.log(error);
    result.status(500).json(error);
});
});

router.get('/login', (request, result) => {
    if (request.session.loggedIn){
        result.redirect('/');
        return;
    }
    result.render('login');
    });
router.get('/signup', (request, result) =>{
    result.render('signup');

});
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
                attributes: ['user']
            }
        },
    {
        model: User,
        attribute: ['user']
    }
    ]
    }).then (artboardData => {
        if (!artboardData){
            result.status(404).json({message: 'No artboard was found with this id'});
            return
        }
        const artboard = artboardData.get({plain: true});
        console.log(artboard);
        result.render('single-artboard', {artboard, loggedIn: request.session.loggedIn });

    }).catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
router.get('/artboard_comments', (request, result)=>{
    Post.findOne({
        where: {
            id: request.params.id
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
                    attributes: ['user']
                }
            },
            {
                model: User,
                attributes: ['user']
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

        res.render('artboard', { artboard, loggedIn: request.session.loggedIn });
    })
    .catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
console.log(router);
module.exports = router;




