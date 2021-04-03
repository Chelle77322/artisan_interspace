async function artPostHandler(event){
   event.preventDefault();
   const artPost = document.querySelector.bind(document);
    const name = artPost('input[name="artisan-name"]').value.trim();
    console.log(name);
    const description = artPost('input[name="description"]').value.trim();
    console.log(description);

    const response = await fetch ('/api/artboard', {
        method: 'POST',
        body: JSON.stringify({
           name : name,
            description: description
      }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
       document.location.replace('/artboard');
    }else{
       alert(response.statusText);
    }
};
document.querySelector('#new-art-form').addEventListener('submit', artPostHandler);