const router = require('express').Router();
const {User, Artisan, ArtComment} = require('../../models');

router.post('/', async (request, result)=> {
try {
    const user = await User.create(request.body);
    request.session.save(()=>{
        (request.session.user_id = user.id),
        (request.session.logged_in = true);
    });
    result.status(200).json(user);
} catch(error){
    result.status(400).json(error);
}

});

//Finding User after login
router.post('/login', async (request, result) => {
   
    User.findOne({
            where: {
                email: request.body.email
               
            }
           
        }).then(userData => {
            if (!userData) {
                result.status(400).json({ message: 'No user found with that username!' });
                return;
            }
            const validPassword = userData.checkPassword(request.body.password);

            if (!validPassword) {
                result.status(400).json({ message: 'Incorrect password entered, try again' });
                return;
            }
            request.session.save(() => {

                (request.session.user_id = userData.id),
                (request.session.name = userData.name),
                (request.session.loggedIn = true);

                result.json({ user: userData, message: 'You are now logged in!' });
            });
        })
        .catch(error => {
            console.log(error);
            result.status(500).json(error);
        });
});

//GET all user data
router.get('/', async (request, result) => {
  User.findAll({
      attributes: {exclude: ['[password']}
}). then(userData => result.json(userData))
.catch(error => {
    console.log(error);
    result.status(500).json(error);
    });
});

//GET one user based on id
router.get('/:id', (request, result) => {
User.findOne({
attributes: {exclude: ['[password']},
where: { id: request.params.id},
include: [{
    model: Artisan,
    attributes: [
        'id',
        'name',
        'description',
        'date_created'
    ]
},
{
    model: ArtComment,
    attributes: [ 'id', 'comment_text', 'date_created'],
include: {
    model: Artisan,
    attributes: ['name']
}
},
{
    model: Artisan,
    attributes: ['name'],
}]
}). then(userData => {
    if (!userData){
        result.status(404).json({message:'No user was found with this id' });
        return;
    }
    result.json(userData);
}).catch(error => {
    console.log(error);
    result.status(500).json(error);
});
});

//Create User via POST

router.post('/', (request, result) => {
    User.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password

    }).then(userData => {
    request.session.save(() => {
        request.session.user_id = userData.id;
        request.session.name = userData.name;
        request.session.email = userData.email;
        request.session.loggedIn = true;
        result.json(userData);
    });
}).catch (error => {
    console.log(error);
    result.status(500).json(error);
});
});
 
router.post ('/logout',(request, result) => {
    if(request.session.loggedIn){
        request.session.destroy(() =>{
            result.status(204).end();
        });
    } else{
        result.status(404).end();
    }
});

//Updates user
router.put('/:id', (request, result) => {
    User.update(request.body, {
        individualHooks: true,
        where: {id: request.params.id}
    }).then(userData => {
        if(!userData[0]){
            result.status(404).json({message: 'No user was found that matched this id'});
            return;
        }
        result.json(userData);
        console.log(userData);
    })
    .catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});
//Deletes the user and all associated data
router.delete('/:id', (request, result) => {
    User.destroy({
        where:{id: request.params.id}
    }).then(userData => {
        if(!userData){
        result.status(404).json({message:'No user was found with this id'});
        return;
        }
        result.json(userData);
    })
    .catch(error => {
        console.log(error);
        result.status(500).json(error);
    });
});

module.exports = router;

  


