const WithAuth = (request, result, next) => {
    //Checks to see if user is logged in. If user is not logged in will be redirected to login 

    if (!ResultSetHeader.session.logged_in){
        result.redirect('/login');
    } else{
        next();
    }
};
module.exports = WithAuth;