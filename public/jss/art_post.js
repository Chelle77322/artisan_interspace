async function newFormHandler(event){
    event.preventDefault();
    const name = document.querySelector('input[name="artisan-name"]').value;
    const description = document.querySelector('input[name="description"]').value;

    const response = await fetch (`/api/artboard`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
        document.location.replace('/artboard');
    }else{
        alter(response.statusText);
    }
};
document.querySelector('#new-art-form').addEventListener('submit', newFormHandler);