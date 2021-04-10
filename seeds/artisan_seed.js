const {Artisan} = require('../models');
const artboardData = [{
    name: "Acrylic Pour - Gelato",
      image:"/css/images/artwork/trial.jpg",
      description: "An acrylic pour using a tree ring technique with colours of pink, turquoise and rose gold highlights",
      date_created:"12/04/2020"
      
     
    },
    {
      name: "Clouds of Sheep",
      description: "An abstract interpretation of Australia's wool industry",
      date_created:"12/04/2020"
     
    },
    {
      name: "Night stopover",
      description: "Sponge painting of birds resting in a tree.",
      date_created:"12/12/2020"
      
    },
    {
        name: "Acrylic Splatter",
        description: "Ombre splatter painting",
        date_created:"1/03/2021"
       
      }

    ];
    const seedArtisan = () => Artisan.bulkCreate(artboardData);
    module.exports = seedArtisan;