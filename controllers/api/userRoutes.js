const router = require('express').Router();
const {User} = require('../../models');

router.post('/', async (request, result)=>{
    try {
        const userData = await User.create(request.body);

        request.session.save(() => {
            request.session.logged_in = true;
            result.status(200).json(userData);

        });
    } catch (error){
        result.status(400).json(error);
    }

});
router.post('/login', async (request, result) => {
 try {
     const userData = await User.findOne ({
         where: {
             email: request.body.email} 
         });
         if (!userData) {
             result.status(400).json({message: 'Incorrect email or password entered, please try again'});
             return;
         }
    const validPassword = userData.checkPassword(request.body.password);

    if (!validPassword){
        result.status(400).json( {message:'Incorrect email or password entered, please try again'});
        return;
    }
    request.session.save(() => {
        request.session.user_id = userData.id;
        request.session.logged_in = true;

        result.json({ User: userData, message: 'You are now logged in !'});
    });
} catch (error) {
    result.status(400).json(error);
}
});
router.post('/logout', (request, result) => {
    if (request.session.logged_in){
        request.session.destroy(() => {
            result.status(204).end();
        });
    } else {
        result.status(404).end();
    }
});
module.exports = router;