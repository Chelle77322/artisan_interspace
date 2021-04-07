async function ArtCommentFormHandler(event){
    event.preventDefault();
    const artComment = document.querySelector.bind(document);
    const comment_text = artComment('input [name = "comment-text"]').value.trim();
    const comment_date = artComment('input [date = "comment-date"]').value.trim();
    const artComment = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 ];
    
        if (comment_text){
            const response = await fetch ('/api/users/art_comment', {
                method: 'POST',
                body: JSON.stringify({
                    artcomment_id,
                    comment_text,
                    comment_date,
                }),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok){
                document.location.reload('/artboard');
            } else{
                alert(response.statusText);
                document.querySelector('#comment-form');
            }
        }
}
document.querySelector('#comment-form').addEventListener('submit', ArtCommentFormHandler);