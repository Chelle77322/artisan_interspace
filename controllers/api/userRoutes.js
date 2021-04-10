const router = require('express').Router();
const {User, Artisan, ArtComment} = require('../../models');

//Create user
router.post('/', async (request, result) => {
try {
    const userData = await User.create(request.body);
    request.session.save(()=>{
        (request.session.user_id = user.id),
        (request.session.logged_in = true);
    });
    result.status(200).json(userData);
} catch(error){
    result.status(400).json(error);
}
});
//#### All Sign Up and Login Routes are here####//
//Sign up new user here - POST METHOD

router.post('/signup', async (request, result) => {
    try{
        const userData = await  User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
    
        });
        request.session.save(() => {
            (request.session.name = userData.name),
            (request.session.email = userData.email),
            (request.session.logged_in = true);
        });
        result.status(200).json(userData);
       
      
    } catch (error){
        result.status(400).json(error);

    }
});

//User login - POST METHOD
router.post('/login', async (request, result,) => {
  try {
      const userData = await User.findOne({
        where: {
            email: request.body.email,
            
           
        },
  });
        if (!userData) {
            result.status(400).json({ message: 'No user found with that username!' });
                return;
            }
        const validPassword = await userData.checkPassword(request.body.password);

            if (!validPassword) {
                result.status(400).json({ message: 'Incorrect password entered, try again' });
                return;
            }
        request.session.save(() => {
        (request.session.user_id = userData.id),
        (request.session.name = userData.name),
        (request.session.logged_in = true);
    result.status(200).json(userData);
        });
        } catch(error) {
        result.status(400).json(error);
        console.log(error);
        }
});
//User Logout - POST METHOD
router.post ('/logout',async(request, result) => {
    if(request.session.logged_in){
        request.session.destroy(() => {
            result.status(204).end();
        });
    } else{
        result.status(404).end();
    }
    
});
//### ALL GET ROUTES FOR USER ###//

//Returns all user data but excludes password
router.get('/', async (request, result) => {
    try{
        const userData = await User.findAll({
            attributes: {exclude: ['[password']} 
        });
        result.status(200).json(userData);
    }
    catch(error){
        result.status(500).json(error);
        console.log(error);
    }     
});
//Returns one user based on id
router.get('/profile/:id', async (request, result) => {
    const userData = await User.findOne ({
        attributes: {exclude: ['[password']},
            where: { id: request.params.id},
                include: [{
                model: Artisan,
                    attributes: [
                        'id',
                        'image',
                        'name',
                        'description',
                        'date_created'
    ]
},
{
    model: ArtComment,
    attributes: [
            'id', 
            'comment_text', 
            'comment_date',
            'user_id', 
            'artisan_id'],
    
    include: {
    
        model: Artisan,
    attributes: ['name']
    }
},      
{
    model: Artisan,
    attributes: ['name'],
}]

    });
    if(!userData){
        result.status(404).json({message: "No User was found matching this id"});
        return;
    } else{
        result.status(200).json(userData);
    }
});  
       
//Updates an individual user based on their hooks
router.put('/users/:id', async (request, result) => {
    try{ 
        const userData = await User.update(request.body, {individualHooks:true,
            where: {id: request.params.id}});
    
    if(!userData[0]){
        result.status(404).json({message: 'No user was found that matched this id'});
        return;
    } else{
    result.status(200).json(userData);
    console.log(userData);
}
    }
    catch(error){
        result.status(500).json(error);
        console.log(error);
    }
});

//Deletes the user and all associated data
router.delete('/users/:id', async (request, result) => {
 try{ 
     const userData = await User.destroy(
         {where:{
             id:request.params.id
         },
        });

         
        if(!userData[0]){
            result.status(404).json({message: 'No user was found that matched this id'});
            return;
        } else {
        result.status(200).json(userData);
        console.log(userData);
    }
}
        
        catch(error){
            result.status(500).json(error);
            console.log(error);
        }
     
    });
       


module.exports = router;

  


