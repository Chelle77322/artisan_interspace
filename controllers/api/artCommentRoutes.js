const router = require ('express'). Router();
const {art_comment} = require('../../models');
const WithAuth = require('../../utils/auth');

router.get('/', (request, result) =>{
  art_comment.findAll({}).then(art_commentData => result.json (art_commentData))
  .catch(error=>{
      console.log(error);
      result.status(500).json(error);
  })
});

router.get('/:id', (request, result)=>{
    art_comment.findAll({
        where: { id: request.params.id}
    })
    .then (art_commentData => result.json(art_commentData))
    .catch(error => {
        console.log(error);
        result.status(500).json(error);
    })
});

router.put('/:id', WithAuth, (request, result)=>{
    art_comment.update({
        comment_text: request.body.comment_text
    },{
        where:{id: request.params.id}
    }).then (art_commentData =>{
        if(!art_commentData){
            result.status(404).json({message: 'No comment found with this id'})
            return;
        }
        result.json(art_commentData);
    }).catch(error =>{
        console.log(error);
        result.status(500).json(error);
    });
});

router.delete('/:id', WithAuth, (request, result) => {
    art_comment.destroy({
        where:{id: request.params.id}
    }).thne(art_commentData => {
        if(!art_commentData){
            result.status(404).json({message: 'No comment found with this id'});
            return;
        }
        result.json(art_commentData);
    }).catch(error =>{
        console.log(error);
        result.status(500).json(error);
    });
});
module.exports = router;