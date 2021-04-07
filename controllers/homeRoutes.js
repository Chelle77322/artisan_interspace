 const sequelize = require('../config/connection');
 const router = require ('express').Router();
const {Artisan, User, ArtComment} = require('../models');

const WithAuth = require('../utils/auth');
//Gets all information
router.get('/', (request, result) => {
    Artisan.findAll({
        attributes:[
            'id',
            'name',
            'image',
           'description',
          'date_created',
       ],
      include: [
        {
           model: ArtComment,
            attributes: [
                'id',
                'comment_text',
                'comment_date',
            ],
             include: {
                model: User,
                attributes: ['name']
             }
         }   
        ]
    });
});

router.get('/', (request, result) => {
    try {
      result.render('homepage');
       result.status(200);
    } catch (error) {
        result.status(500).json(error);
    }
});
//This is where you sign up as an artist route
router.get('/signup', async ( request, result) => {
    try{
        const userData = await User.findAll({
            attributes:['id', 'name', 'email', 'password']
        });
        const user = userData.map(user => user.get({plain:true}))
        result.render("signup", {user});
    }catch (error){
        result.status(500).json(error)
    }

});

//Gets all Artisan Interspace posts with ids
router.get ('/artboard/:id', async(request, result) => {
   try{
       const user = await Artisan.findAll({
           attributes:[
                'id',
                 'name',
                 'image',
                 'description',
                  'date_created',
              ],
              include:[{
                 model: ArtComment,
                 attributes: ['id', 'comment_text','comment_date'],
                  include: { 
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
        var artboard = artists.map(artboard => artboard.get({plain:true}));
        result.render('artboard', {artboard, logged_in:request.session.logged_in});
    }
   catch (error){
       result.status(404).json(error);
        console.log(error);
    }
   
});

//Gets information after login
router.get('/login',async(request, result) => {
    
   if (request.session.logged_in){
       result.redirect('/');
        return;
    }
    result.render('login');
    const user = userData.get({plain: true});
    result.status(200);
    result.render('artboard', {
        ...user,  logged_in: request.session.logged_in,
    });

});

//Gets art_comments associated with user id after login
router.get ('/artboard/:id', async (request, result)=> {
    try{
       var artCommentData = await ArtComment.findAll({
            where: {
                id: request.params.id
         },
           attributes: [
             'id',
              'comment_text',
              'comment_date',
            ],
           include:[{
                model: Artisan,
               attributes: ['id','name', 'description','user_id', 'date_created'],
              include: { 
                  model: User,
                  attributes: ['name']
                }
            },
        {
           model: User,
           attribute: ['name']
        },
       ],
        });
       if (!artCommentData){
            result.status(404).json({message: 'No art comments where found that matched the user id'});
           return;
        } else{
        const comment = artCommentData.get({plain:true});
       result.render('artboard', 
       {
          ...comment, logged_in: request.session.logged_in});
   }
  }
    catch(error){
      result.status(404).json(error);
      console.log(error);
    }
});
//Finds one art comment based on id
router.get('/artboard_comment/:id', async (request, result) => {
    try{
        const comment = await ArtComment.findByPk({
            where: {
                id: request.body.params.id
            },
            attributes: [
                'id',
                'comment_text',
                'comment_date',
               
            ],
            include: [{
                   model: Artisan,
                  attributes: ['id','name', 'description','user_id', 'date_created'],
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
        });
        if (!comment) {
            result.status(404).json({ message: 'No comments where found with this id' });
            return;
          }
          const comments = artCommentData.get({plain:true});

        result.render('artboard',
         {...comments, logged_in: request.session.logged_in});    
        
    }
    catch (error){
        result.status(404).json(error);
        console.log(error);
    }
    
    
});
//console.log(router);
module.exports = router;




