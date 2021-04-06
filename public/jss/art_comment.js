async function ArtCommentFormHandler(event){
    event.preventDefault();
    const artComment = document.querySelector.bind(document);
    const comment_text = artComment('input[name="comment-body"]').value.trim();
    //const artisan_id = window.location.toString().split('/')[
       // window.location.toString().split('/').length -1 ];
    
        if (comment_text){
            const response = await fetch ('/api/users/art_comment', {
                method: 'POST',
                body: JSON.stringify({
                    artisan_id : artisan_id,
                    comment_text: comment-text
                }),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok){
                document.location.reload('/profile');
            } else{
                alert(response.statusText);
                document.querySelector('#comment-form');
            }
        }
}
document.querySelector('#comment-form').addEventListener('submit', ArtCommentFormHandler);