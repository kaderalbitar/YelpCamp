const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
  console.log('Database connected');
})
.catch((err) => {
  console.log('connection error:');
  console.log(err);
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6290e0ba8f7a949845d389ac',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro itaque pariatur exercitationem at quisquam odio quas amet suscipit, facilis vel illum sunt mollitia delectus, temporibus ex officia. Hic, molestiae alias?',
      price,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dxvxciwmi/image/upload/v1663779704/YelpCamp/jaxagyijoeqd87fygapw.jpg',
          filename: 'YelpCamp/jaxagyijoeqd87fygapw',
        },
        {
          url: 'https://res.cloudinary.com/dxvxciwmi/image/upload/v1663779707/YelpCamp/s9pmgcvw7dxxdmi3mccq.jpg',
          filename: 'YelpCamp/s9pmgcvw7dxxdmi3mccq',
        }
      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});