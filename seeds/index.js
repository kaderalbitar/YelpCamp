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
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro itaque pariatur exercitationem at quisquam odio quas amet suscipit, facilis vel illum sunt mollitia delectus, temporibus ex officia. Hic, molestiae alias?',
      price
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});