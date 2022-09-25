const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62fde603ffc857c1d19aa413',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur maxime, odio repellendus dolores quaerat maiores reiciendis nobis fuga facere nemo officia, expedita nostrum est eos sequi ex iste qui voluptatem.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dny2szsok/image/upload/v1661019194/YelpCamp/oqrmeos4p96duxj0c2sn.jpg',
                  filename: 'YelpCamp/oqrmeos4p96duxj0c2sn'
                },
                {
                  url: 'https://res.cloudinary.com/dny2szsok/image/upload/v1661019194/YelpCamp/w5t34bzzugh6yrq63til.jpg',
                  filename: 'YelpCamp/w5t34bzzugh6yrq63til'
                }
              ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})