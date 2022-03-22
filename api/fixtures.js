const mongoose = require('mongoose');
const config = require('./config');
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");
const User = require("./models/User");
const TrackHistory = require("./models/TrackHistory");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [adele, fugees, drake] = await Artist.create({
        name: 'Adele',
        information: 'English singer-songwriter',
        image: 'Adele-30-Cover@2000x1500-1068x801.jpg',
        is_published: false,
    }, {
        name: 'The Fugges',
        information: 'Fugees is an American hip hop group formed in the early 1990s.',
        image: 'download.jpeg',
        is_published: true,
    }, {
        name: 'Drake',
        information: 'Aubrey Drake Graham is a Canadian rapper, singer, and actor',
        image: 'Drake.jpg',
        is_published: true,
    });

    const [twentyFive, score, hits, life, scorpion] = await Album.create({
        artist: adele,
        title: '25',
        year: 'November 20, 2015',
        image: 'Adele_-_25_(Official_Album_Cover).png',
        is_published: true,
    }, {
        artist: fugees,
        title: 'The Complete Score',
        year: '2001',
        image: 'R-5221184-1389211873-2035.jpg',
        is_published: true,
    }, {
        artist: fugees,
        title: 'Greatest Hits',
        year: 'March 25, 2003',
        is_published: false,
    }, {
        artist: drake,
        title: 'More Life',
        year: 'March 18, 2017',
        image: 'Drake_-_More_Life_cover.jpg',
        is_published: true,
    }, {
        artist: drake,
        title: 'Scorpion',
        year: 'June 29, 2018',
        image: 'drake-scorpion.jpg',
        is_published: true,
    });

    const [ab, cd, ig, hi, jk, kl, mn, pq, rs, tx, yz, rm, jh, oz, lp,
        ok, no, pr, hr, yep, jq, ln, bk, ml, gf] = await Track.create({
        album: twentyFive,
        trackName: 'Hello',
        duration: '4:57',
        is_published: true
    }, {
        album: twentyFive,
        trackName: 'Send My Love',
        duration: '3:45',
        is_published: false
    }, {
        album: twentyFive,
        trackName: 'When We Were Young',
        duration: '5:43',
        is_published: true
    }, {
        album: twentyFive,
        trackName: 'Love in the Dark',
        duration: '4:47',
        is_published: true
    }, {
        album: twentyFive,
        trackName: 'All I Ask',
        duration: '4:30',
        is_published: true
    }, {
        album: score,
        trackName: 'Ready or Not',
        duration: '3:48',
        is_published: true
    }, {
        album: score,
        trackName: 'Red Intro',
        duration: '1:52',
        is_published: true
    }, {
        album: score,
        trackName: 'Zealots',
        duration: '4:21',
        is_published: false
    }, {
        album: score,
        trackName: 'Family Business',
        duration: '5:44',
        is_published: true
    }, {
        album: score,
        trackName: 'The Mask',
        duration: '4:51',
        is_published: true
    }, {
        album: hits,
        trackName: 'No Woman No Cry',
        duration: '4:35',
        is_published: true
    }, {
        album: hits,
        trackName: 'Killing me Softly With his Song',
        duration: '4:13',
        is_published: true
    }, {
        album: hits,
        trackName: 'Vocab',
        duration: '4:03',
        is_published: false
    }, {
        album: hits,
        trackName: 'FU-GEE-LA',
        duration: '4:06',
        is_published: true
    }, {
        album: hits,
        trackName: 'How Many Mics',
        duration: '4:29',
        is_published: true
    }, {
        album: life,
        trackName: 'Get it together',
        duration: '4:05',
        is_published: true
    }, {
        album: life,
        trackName: 'Free smoke',
        duration: '3:40',
        is_published: true
    }, {
        album: life,
        trackName: 'Passionfruit',
        duration: '4:59',
        is_published: false
    }, {
        album: life,
        trackName: 'No Long Talk',
        duration: '2:30',
        is_published: true
    }, {
        album: life,
        trackName: 'Sacrifices',
        duration: '6:41',
        is_published: true
    }, {
        album: scorpion,
        trackName: 'God s plane',
        duration: '5:56',
        is_published: true
    }, {
        album: scorpion,
        trackName: 'Survival',
        duration: '2:53',
        is_published: true
    }, {
        album: scorpion,
        trackName: 'Nonstop',
        duration: '3:58',
        is_published: false
    }, {
        album: scorpion,
        trackName: 'Jaded',
        duration: '5:00',
        is_published: true
    }, {
        album: scorpion,
        trackName: 'March 14',
        duration: '5:09',
        is_published: false
    });

    const [sara, alina] = await User.create({
        email: 'saikal@gmail.com',
        password: '000',
        displayName: 'sara',
        role: 'admin',
        token: '5enDI2paOqusPavVWOnwB'
    }, {
        email: 'alina@mail.ru',
        password: '000',
        displayName: 'alina',
        role: 'user',
        token: '8enDI2paOqusBavVWOnwL'
    });

    await TrackHistory.create({
        user: sara,
        track: jk,
        dateTime: 'Fri Mar 05 2022 00:30:06 GMT+0600 (East Kazakhstan Time)'
    }, {
        user: sara,
        track: ok,
        dateTime: 'Fri Mar 09 2022 00:27:06 GMT+0600 (East Kazakhstan Time)'
    }, {
        user: ab,
        track: jk,
        dateTime: 'Fri Mar 04 2022 00:45:06 GMT+0600 (East Kazakhstan Time)'
    }, {
        user: alina,
        track: rm,
        dateTime: 'Fri Mar 04 2022 00:29:59 GMT+0600 (East Kazakhstan Time)'
    });

    await mongoose.connection.close();
};

run().catch(e => console.log(e));