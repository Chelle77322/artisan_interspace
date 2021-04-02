const signupFormHandler = async(event) =>{
    event.preventDefault();

    const artSign = document.querySelector.bind(document);

    const name = artSign('#name-signup').value.trim();
    const password = artSign('#password-signup').value.trim();
    const email = artSign('#email-signup').value.trim();
    if (name && password && email){
        const response = await fetch ('/api/homeRoutes',{
            method: 'POST',
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok){
            console.log('success');
            document.location.replace('/artboard');
        } else {
            alert(response.statusText);
            console.log(error);
            console.log(response);

        }
    }
}
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler)