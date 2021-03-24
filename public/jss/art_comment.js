async function ArtCommentFormHandler(event){
    event.preventDefault();
    const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
    const artisan_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 ];
    
        if (comment_text){
            const response = await fetch ('/api/art_comment', {
                method: 'POST',
                body: JSON.stringify({
                    artisan_id,
                    comment_text
                }),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok){
                document.location.reload();
            } else{
                alert(response.statusText);
                document.querySelector('#comment-form').style.display = "block";
            }
        }
}
document.querySelector('.comment-form').addEventListener('submit', ArtCommentFormHandler);