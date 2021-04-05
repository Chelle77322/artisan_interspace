const Login = async (event) => {
    event.preventDefault();
//Collects values from login form
const login = document.querySelector.bind(document);
const email = login('#email-login').value.trim();
const password = login('#password-login').value.trim();
if (email && password){
    //This sends a POST request to API endpoint
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email, 
            password: password}),
        headers: { 'Content-Type': 'application/json'},
    });


    if(response.ok){
        //On Success will go to profile page of user
        result.render('profile',{user});
    } else {
        alert(response.statusText);
    }
    }
};


console.log("Logged in I think");
document.querySelector('#login-form').addEventListener('submit', Login);