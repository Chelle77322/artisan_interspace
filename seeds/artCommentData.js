const {ArtComment} = require('../models');
const artCommentData = [{
    comment_text:" Fantasic piece of art work",
    user_id: 2,
    artisan_id: 1
},
{
    comment_text: "Love the bold and vibrant brush strokes",
    user_id:1,
    artisan_id:2
},
{
    comment_text: "Great use of mediums",
    user_id:3,
    artisan_id: 3
}];
const seedArtComments = () => ArtComment.bulkCreate(artCommentData);
module.exports = seedArtComments;