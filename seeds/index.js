if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl)
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
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '63382e4a83cef7cf7a59e833',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro itaque pariatur exercitationem at quisquam odio quas amet suscipit, facilis vel illum sunt mollitia delectus, temporibus ex officia. Hic, molestiae alias?',
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dxvxciwmi/image/upload/v1664025000/YelpCamp/tents_ztyiwu.jpg',
          filename: 'YelpCamp/jaxagyijoeqd87fygapw',
        },
        {
          url: 'https://res.cloudinary.com/dxvxciwmi/image/upload/v1664024981/YelpCamp/sun_jkesa7.jpg',
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