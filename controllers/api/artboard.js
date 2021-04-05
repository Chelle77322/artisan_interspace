const router = require('express').Router();
const {Artisan, User, ArtComment} = require('../../models');
const WithAuth = require('../../utils/auth');
//ALL POSTS HERE
//Posting all art 
router.post('/', async(request, result) => {
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
  
//ALL GETS ARE HERE
// Gets and returns all art work associated with a particular user ID
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
            const artBoard = artBoard.map(artBoard => art.get({ plain: true }));
            result.render('artboard', {artBoard, logged_in: true });
        }

    } catch (error){
        result.status(500).json(error);
        console.log(error);
    }
    
});
//Creating a post associated with a user via WithAuth

router.get('/artboard/:id', WithAuth, async (request, result) => {
    try {
    const artBoard = await Artisan.create({
        name:request.body.name,
        description: request.body.description,
        user_id: request.session.user_id,
        image:request.body.image,
        date_created: request.body.date_created
    
    });
    const artBoard = artBoard.map(artBoard => artBoard.get({ plain: true }));
    result.render('artboard', {artBoard, logged_in: true });
}
catch (error){
    result.status(400).json(error);
    console.log(error);
}
    
});
//Gets all artwork posted on site
router.get('/artboard', async (request, result) => {
    try{
        const artBoard = await Artisan.findAll({
            attributes:[
                'id',
                'name',
                'description',
                'date_created'
            ],
            order:[
                ['date_created', 'description']
            ],
            include: [{
                model: User,
                attributes: ['name']
            },
            {
                model: ArtComment,
                attributes: ['id','comment_text','artisan_id', 'user_id', 'date_created'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }]
        });
        result.status(200).json(artBoard);
    }
    catch(error){
        result.status(500).json(error);
    }

    });

//ALL PUTS ARE HERE
//Putting the post up after form submit by user
router.put('/artboard/:id', WithAuth, async (request, result) => {
try{
    const artBoard = await Artisan.update({
        where:{id:request.params.id},
        
        name: request.body.name,
        description: request.body.description,
        image:request.body.image,
        date_created: request.body.date_created,    
    });
    const artboard = artBoard.map(artBoard => artBoard.get({ plain: true }));
    result.render('artboard', {artBoard, logged_in: true });

}
catch(error){
    result.status(400).json(error);
    console.log(error);
}

});
//ALL DELETES ARE HERE
//Deletes a single post using DESTROY
router.delete('/artboard/:id', WithAuth, async (request, result) => {
    try {
        const artBoard = await Artisan.destroy({
            where: {id: request.params.id}
        });
        if(!artBoard){
            result.status(404).json({message: "No art was found that matched the user id"});
            return;
        }
        result.status(200).json(artBoard);
        console.log(artBoard);
    }
    catch(error){
        result.status(500).json(error);
        console.log(error);
    }
});

module.exports = router;