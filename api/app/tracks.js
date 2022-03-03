const express = require('express');
const Track = require("../models/Track");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const query = {};

        if (req.query.album) {
            query.album = req.query.album;
        }

        const tracks = await Track.find(query);

        return res.send(tracks);
    } catch (e) {
        next(e);
    }
});


router.post('/', async (req, res, next) => {
    try {
        if (!req.body.trackName || !req.body.album || !req.body.duration) {
            return res.status(400).send({message: 'Please fill out all fields'});
        }

        const trackData = {
            trackName: req.body.trackName,
            album: req.body.album,
            duration: req.body.duration,
        };

        const track = new Track(trackData);

        await track.save();

        return res.send({message: 'Created new track', id: track._id});
    } catch (e) {
        next(e);
    }
});

module.exports = router;