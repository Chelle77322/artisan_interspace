const signupArtist = async(event) =>{
    event.preventDefault();

    const artSign = document.querySelector.bind(document);

    const name = artSign('#user_name').value.trim();
    const password = artSign('#user_password').value.trim();
    const email = artSign('#user_email').value.trim();
    if (name && password && email){
        const response = await fetch ('/api/users',{
            method: 'POST',
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            }),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok){
            console.log('success' + response.ok);
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
            console.log(error);
            console.log(response.statusText);

        }
    }
};
document.querySelector('#signup-form').addEventListener('submit', signupArtist)