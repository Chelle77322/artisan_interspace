const artistLogin = async (event) => {
    event.preventDefault();
//Collects values from login form
const login = document.querySelector.bind(document);
const email = login('#email-login').value.trim();
const password = login('#password-login').value.trim();
if (email && password){
    //This sends a POST request to API endpoint
    const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({
            email: email, 
            password: password}),
        headers: { 'Content-Type': 'application/json'},
    });


    if(response.ok){
        //On Success will go to profile page of user
        result.render('/profile');
    } else {
        alert(response.statusText);
    }
    }
};


document.querySelector('#login-form').addEventListener('submit', artistLogin);