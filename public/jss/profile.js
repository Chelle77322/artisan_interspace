const profileCreator = async (event) => {
    event.preventDefault();
    const profile = document.querySelector.bind(document);
  
    const name = profile('#artisan-name').value.trim();
  
    const description = profile('#artisan-description').value.trim();
  
    if (name && description) {
      const response = await fetch('/api/artboard', {
        method: 'POST',
        body: JSON.stringify({ 
          name: name, 
          description: description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/artboard');
      } else {
        alert('Failed to create art work');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete artisan');
      }
    }
  };
  
  document.addEventListener('append', profileCreator);
  console.log("You got here at least");
console.log(profileCreator);