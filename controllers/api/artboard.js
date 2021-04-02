const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Artisan, User, ArtComment} = require('../../models');
const WithAuth = require('../../utils/auth');
router.get('/', WithAuth, (request, result) => {
    Artisan.findAll({
            where: {
                user_id: request.session.user_id
            },
            attributes: [
                'id',
                'name',
                'description',
                'date_created',
            ],
            include: [{
                    model: ArtComment,
                    attributes: ['id', 'comment_text', 'artisan_id', 'user_id', 'date_created'],
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
            const art = artboardData.map(art => art.get({ plain: true }));
            result.render('artboard', {art, loggedIn: true });
        })
        .catch(error => {
            console.log(error);
            result.status(500).json(error);
        });
});
router.get('/edit/:id', WithAuth, (request, result) => {
    Artisan.findOne({
            where: {
                id: request.params.id
            },
            attributes: ['id',
                'name',
                'description',
                'date_created'
            ],
            include: [{
                    model: User,
                    attributes: ['name']
                },
                {
                    model: ArtComment,
                    attributes: ['id', 'comment_text', 'artisan_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        .then(artboardData => {
            if (!artboardData) {
                result.status(404).json({ message: 'No art found with this id' });
                return;
            }

            const art = artboardData.get({ plain: true });
            result.render('edit-post', { art, loggedIn: true });
        })
        .catch(error => {
            console.log(error);
            result.status(500).json(error);
        });
})
router.get('/new', (request, result) => {
    result.render('new-post');
});



module.exports = router;