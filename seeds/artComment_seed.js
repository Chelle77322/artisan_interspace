const {ArtComment} =require('../models');

const artCommentData = [{
    
        comment_text: "Fantasic piece of art work",
        comment_date:"17/10/2020",
        user_id :6,
        artisan_id:1
        
    },
    {
        comment_text: "Love the bold and vibrant brush strokes",
        comment_date:"13/11/2020",
        user_id:1,
        artisan_id:2
       
    },
    {
        comment_text: "Great use of mediums",
        comment_date:"11/03/2021",
        user_id:3,
        artisan_id: 3
    
    }
];
const seedArtComments = () => ArtComment.bulkCreate(artCommentData);
module.exports = seedArtComments;
