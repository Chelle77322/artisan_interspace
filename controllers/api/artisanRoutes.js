const router = require ('express').Router();
const {Artisan} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (request, result)=> {
try {
    const newArtisan = await Artisan.create({
        ...request.body,
        user_id: request.session.user_id,
    });
    result.status(200).json(newArtisan);
} catch (error){
    result.status(400).json(error);
}
});
router.delete('./user/:id', withAuth, async (request, result) => {
    try {
        const ArtisanData = await Artisan.destroy({
            where: {
                id: request.params.id,
                user_id: request.session.user_id,
            },
        });

    if(!ArtisanData){
        result.status(404).json({message: 'No artisan found with this id!'});
        return;
    }
    result.status(200).json(ArtisanData);
    } catch (error){
        result.status(500).json(error);
    }
});
module.exports = router;