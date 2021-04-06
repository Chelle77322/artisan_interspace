const path = require('path');
const express = require('express');
const session = require ('express-session');
const handlebars = require('express-handlebars');
const routes = require ('./controllers');
const helpers = require ('./utils/helpers');
//const multer = require('multer');

const sequelize = require ('./config/connection');
const SequelizeStore = require('connect-session-sequelize')
(session.Store);

const app = express();
const port = process.env.PORT || 5110;

//Setting up Handlebars.js engine
const bars = handlebars.create({ helpers });

const sesh = {
    secret: 'SSH secret secret',
    cookie: {maxAge: 4800000000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sesh));
//Let Express.js know what template engine it will be using
app.engine('handlebars', bars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));



app.use(routes);

app.get('public', async (request, result) => {
    result.json("Welcome to the Artisan Interspace")
    console.log(result);
   
});
//Setting up multer package for image upload
//const multer = multer.diskStorage({
  //destination: (request, file, store) => {
  //store(path.join(_dirname,'public'));
  //},

    //filename: (request, file,store) => {
    //const ext = file.mimetype.split('/')[1];
      //store(path.join(_dirname + 'public/'), //`user-${request.user.id}-${Date.now()}.${ext}//`);
    //}
  //});

// sync sequelize models to the database, then turn on the server
sequelize.sync ({force: false}).then(() => {
    app.listen(port, () => console.log(`App is now listening on port ${port}`)); 
    
  });
