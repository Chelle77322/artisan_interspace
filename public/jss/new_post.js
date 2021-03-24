async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="artisan-name"]').value;
    const descripion = document.querySelector('input[name="description"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/artboard');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);