async function signupArtist (event) {
    event.preventDefault();

    const artSign = document.querySelector.bind(document);

    const name = artSign('#user_name').value.trim();
    const password = artSign('#user_password').value.trim();
    const email = artSign('#user_email').value.trim();
    if (name && password && email){
        const response = await fetch ('/api/users/signup',{
            method: 'POST',
            body: JSON.stringify({
                name: name,
                password,
                email
            }),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok){
            document.location.replace('/profile');
        } else {
            alert(response);
            console.log(error);
            console.log(response.statusText);

        }
    }
};
document.querySelector('#signup-form').addEventListener('submit', signupArtist)