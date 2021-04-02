const signupFormHandler = async(event) =>{
    event.preventDefault();

    const ll = document.querySelector.bind(document);

    const name = ll('#name-signup').value.trim();
    const password = ll('#password-signup').value.trim();
    const email = ll('#email-signup').value.trim();
    if (name && password && email){
        const response = await fetch ('/api/users',{
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

        }
    }
}
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler)