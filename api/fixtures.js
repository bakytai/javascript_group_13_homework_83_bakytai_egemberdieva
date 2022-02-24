const mongoose = require('mongoose');
const config = require('./config');
const Artist = require("./models/Artist");
const Album = require("./models/Album");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [adele, fugees, drake] = await Artist.create({
        name: 'Adele',
        information: 'English singer-songwriter',
        image: 'Adele-30-Cover@2000x1500-1068x801.jpg'
    }, {
        name: 'The Fugges',
        information: 'Fugees is an American hip hop group formed in the early 1990s.',
        image: 'download.jpeg'
    }, {
        name: 'Drake',
        information: 'Aubrey Drake Graham is a Canadian rapper, singer, and actor',
        image: 'Drake.jpg'
    });

    await Album.create({
        artist: adele,
        title: '25',
        year: 'November 20, 2015',
        image: 'Adele_-_25_(Official_Album_Cover).png'
    }, {
        artist: fugees,
        title: 'The Complete Score',
        year: '2001',
        image: 'R-5221184-1389211873-2035.jpg'
    }, {
        artist: fugees,
        title: 'Greatest Hits',
        year: 'March 25, 2003',
    }, {
        artist: drake,
        title: 'More Life',
        year: 'March 18, 2017',
        image: 'Drake_-_More_Life_cover.jpg'
    }, {
        artist: drake,
        title: 'Scorpion',
        year: 'June 29, 2018',
        image: 'drake-scorpion.jpg'
    });

    await mongoose.connection.close();
};

run().catch(e => console.log(e));