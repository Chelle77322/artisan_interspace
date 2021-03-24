const router = require ('express'). Router();
const {ArtComment} = require('../../models');
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
//Posting a comment

router.post('/:id', WithAuth, (request, result)=>{
    ArtComment.create({
        comment_text: request.body.comment_text,
        artisan_id: request.body.artisan_id,
        user_id: request.session.user_id,
}).then(artcommentData => result.json(artcommentData)).catch(error => {
    console.log(error);
    result.status(400).json(error);
})

});
//PUT
router.put('/:id', WithAuth, (request, result) =>{
    ArtComment.update({
        comment_text: request.body.comment_text

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

console.log(router);
module.exports = router;