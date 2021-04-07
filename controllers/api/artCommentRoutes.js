const router = require ('express'). Router();
const {ArtComment , User, Artisan} = require('../../models');
const WithAuth = require('../../utils/auth');

router.get('/', (request, result) =>{
  ArtComment.findAll({}).then(artcommentData => result.json (artcommentData))
  .catch(error=>{
      console.log(error);
      result.status(500).json(error);
  })
});

//Gets all ArtComments data based specifically on id
router.get('/:id', (request, result)=>{
    ArtComment.findAll({
        where: { id: request.params.id}
    })
    .then (artcommentData => result.json(artcommentData))
    .catch(error => {
        console.log(error);
        result.status(500).json(error);
    })
});
//POSTING
//Posting all comments here
router.post('/', async (request, result) => {
    try {
        var artcommentData = await ArtComment.findAll({...request.body,user_id: request.session.user_id, 
            attributes:[
            'id',
            'comment_text',
            'comment_date',
        ],
        include: [{
            model: Artisan,
            attributes:[
                "id",
                'image',
                'name',
                'description',
                'date_created',
            ],
            include:{
                model: User,
                attributes: ['name']
            }
        },
        {
            model: User,
            attribute: ['name']
        }
    ],
    });
    result.status(200).json(artcommentData);
    var artcommentData = artcommentData.map(artcommentData => artcommentData.get({plain: true}));
    result.render('artboard', {artcommentData, logged_in: true });
    } catch (error){
        result.status(400).json(error);
    }
})

//Posting a comment + User ID
router.post('/:id', WithAuth, (request, result)=>{
    ArtComment.create({
        comment_text: request.body.comment_text,
        comment_date: request.body.comment_date,
        user_id: request.session.user_id,
        artisan_id: request.body.artisan_id,
        
}).then(artcommentData => result.json(artcommentData)).catch(error => {
    console.log(error);
    result.status(400).json(error);
})

});
//Putting a comment on the board
router.put('/:id', WithAuth, (request, result) =>{
    ArtComment.update({
        comment_text: request.body.comment_text,
        comment_date: request.body.comment_date,

    },{
        where:{id: request.params.id}
    }).then(artcommentData => {
        if (artcommentData){
            result.status(404).json({message: 'No comment was found matching this id'});
            return;
        }
        result.json(artcommentData);
    }).catch(error =>{
        console.log(error);
        result.status(500).json(error);
    });
});
//DELETE A Comment

router.delete('/:id', WithAuth, (request, result) => {
    ArtComment.destroy({
        where:{id: request.params.id}
    }).then(artcommentData => {
        if(!artcommentData){
            result.status(404).json({message: 'No comment found with this id'});
            return;
        }
        result.json(artcommentData);
        console.log(artcommentData);
    }).catch(error =>{
        console.log(error);
        result.status(500).json(error);
    });
});


module.exports = router;