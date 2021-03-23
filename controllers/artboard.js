const router = require('express').Router();
const sequelize = require('../config/connection');
const { Artisan, User} = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, (request, result) => {
    Post.findAll({
            where: {
                user_id: request.session.user_id
            },
            attributes: [
                'id',
                'name',
                'description',
                'date_created',
                'needed_funding'
            ],
            include: [{
                    model: Artisan,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            result.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            result.status(500).json(err);
        });
});
router.get('/edit/:id', withAuth, (request, result) => {
    Post.findOne({
            where: {
                id: request.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                result.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });
            result.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            result.status(500).json(err);
        });
})
router.get('/new', (request, result) => {
    result.render('new-post');
});



module.exports = router;