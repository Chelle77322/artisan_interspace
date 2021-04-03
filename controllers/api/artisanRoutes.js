const router = require ('express').Router();
const {Artisan, ArtComment, User} = require('../../models');
const WithAuth = require('../../utils/auth');

//Gets all artisan data
router.get('/', (request, result) => {
    
    Artisan.findAll({
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
    }).then(artboardData => result.json(artboardData.reverse())).catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
//Find one artisan post based on id
router.get('/:id', (request, result) => {
    Artisan.findOne({
        where:{
            id: request.params.id
        },
        attributes: ['id', 'description','name', 'date_created'],
        include:[{
            model: User,
            attributes: ['name']
        },
        {
            model: ArtComment,
            attributes: ['id','comment_text','artisan_id', 'date_created'],
            include: {
                model: User,
                attributes: ['name']
            }
        }
    ]
 }).then(artboardData => {
     if(!artboardData){
         result.status(404).json({message: 'No art was found that matched this id'});
         return;
     }
     result.json(artboardData);
 }).catch(error => {
     console.log(error);
     result.status(500).json(error);
 });    
});

//Creating a post using WithAuth
router.post('/', WithAuth, (request,result) => {
    Artisan.create({
        name: request.body.name,
        description: request.body.description,
        user_id: request.session.user_id
    }).then(artboardData => result.json(artboardData))
    .catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
//Putting post data on the board - id driven
router.put('/:id', WithAuth, (request,result) => {
    Artisan.update({
        name: request.body.name,
        description: request.body.description
    },{
        where:{id:request.params.id}
    }).then(artboardData =>{
        if(!artboardData){
            result.status(404).json({message: ' No art was found associated with this ID'});
            return;
        }
        result.json(artboardData);
    }).catch(error =>{
        console.log(error);
        result.status(500).json(error);
    });
});
//Deletes a post with DESTROY
router.delete('/:id', WithAuth, (request, result) => {
    Artisan.destroy({
        where: {id: request.params.id}
    }).then(artboardData => {
        if(!artboardData){
            result.status(404).json({message: 'No art was found associated with this ID'});
            return;
        }
        result.json(artboardData);
        console.log(artboardData);
    }).catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
console.log(router);

module.exports = router;