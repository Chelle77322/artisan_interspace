const {User} = require('../models');
const userData = [{
    name: "Michelle Hall",
    email: "serenynadarra@gmail.com",
    password: "firefly34"
    },
    {
      name: "Max Cheek",
      email: "maxC@gmail.com",
      password: "shout456"
    },
    {
      name: "Megan Young",
      email: "OhSoWhimsy@gmail.com",
      password: "glitterball33"
    },
    {
        name: "Saoirse Hall",
        email: "dino_nuggies@gmail.com",
        password: "mmmFOOD11"
      },
      {
        name: "Blake Sanchez",
        email: "liveArt@yahoo.com.au",
        password: "retroArt55"
      },
      {
        name: "Brendan Bland",
        email: "someguy@hotmail.com",
        password: "rooster76"
      }


];
const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;