async function artPosting(event){
   event.preventDefault();
   const artPost = document.querySelector.bind(document);
    const name = artPost('#artisan-name').value.trim();
    const image = artPost('#artisan_image');
    const description = artPost('#artisan-description').value.trim();
    const date = artPost('#artisan-date_created').value.trim();
  

    const response = await fetch ('/api/users/artboard', {
        method: 'POST',
        body: JSON.stringify({
           name : name,
            description: description,
            user_id: user_id,
            image: image,
            date_created: date_created,
      }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
       document.location.replace('/artboard');
    }else{
       alert(response.statusText);
    }
};
document.querySelector('#art_post').addEventListener('submit', artPosting);