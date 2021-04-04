const router = require('express').Router();
const {Artisan, User, ArtComment} = require('../../models');
const WithAuth = require('../../utils/auth');

//Posting art based on user authenication
router.post('/', WithAuth,  async(request, result) => {
    try{
        const artBoard = await Artisan.findAll({
            ...request.body, user_id: request.session.user_id,
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
            ],
        });
        result.status(200).json(artBoard);
        const art = artBoard.map(art => art.get({ plain: true }));
        result.render('artboard', {art, logged_in: true });
    } catch(error){
        result.status(400).json(error);
    }
       
    });
  
   
     
//Returns all art work associated with a particular user ID
router.get('/:id', WithAuth, async (request, result) => {
    try {
        const artBoard = await Artisan.findOne({
            where: {
                user_id: request.params.user_id
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
        ],
        });
        result.status(200).json(artBoard);
      
        if (!artBoard) {
            result.status(404).json({ message: 'No art has been found associated with this user' });
            return;
        } else{
            const art = artBoard.map(art => art.get({ plain: true }));
            result.render('artboard', {art, logged_in: true });
        }

    } catch (error){
        result.status(500).json(error);
        console.log(error);
    }
    
});
router.get('/art_post', (request, result) => {
    result.render('art_post');
});



module.exports = router;