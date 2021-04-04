const router = require('express').Router();
const {Artisan, User, ArtComment} = require('../../models');
const WithAuth = require('../../utils/auth');

//Posting all art 
router.post('/artboard', async(request, result) => {
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
router.get('/artboard/:id', WithAuth, async (request, result) => {
    try {
        const artBoard = await Artisan.findOne({
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
//Creating a post associated with a user via WithAuth

router.get('/artboard/:id', WithAuth, async (request, result) => {
    try {
    const artData = await Artisan.create({
        name:request.body.name,
        description: request.body.description,
        user_id: request.session.user_id,
        image:request.body.image,
        date_created: request.body.date_created
    
    });
    const art = artData.map(art => art.get({ plain: true }));
    result.render('artboard', {art, logged_in: true });
}
catch (error){
    result.status(400).json(error);
    console.log(error);
}
    
});
//Putting the post up after form submit by user
router.put('/artboard/:id', WithAuth, async (request, result) => {
try{
    const artPost = await Artisan.update({
        where:{id:request.params.id},
        
        name: request.body.name,
        description: request.body.description,
        image:request.body.image,
        date_created: request.body.date_created,    
    });
    const art = artData.map(art => art.get({ plain: true }));
    result.render('artboard', {art, logged_in: true });

}
catch(error){
    result.status(400).json(error);
    console.log(error);
}

});




module.exports = router;