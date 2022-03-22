const express = require('express');
const auth = require("../middleware/auth");
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


router.post('/',  auth, async (req, res, next) => {
    try {
        if (!req.body.trackName || !req.body.album || !req.body.duration) {
            return res.status(400).send({message: 'Please fill out all fields'});
        }

        const trackData = {
            trackName: req.body.trackName,
            album: req.body.album,
            duration: req.body.duration,
            is_published: false
        };

        if(req.user.role === 'admin') {
            trackData.is_published = true
        }

        const track = new Track(trackData);

        await track.save();

        return res.send({message: 'Created new track', id: track._id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req,res,next) => {
    try {
        if (req.user.role === 'admin') {

        }
    } catch (e) {
        next(e);
    }
});

router.post('/:id/publish', auth, async (req,res,next) => {
    try {
        if (req.user.role === 'admin') {
            const isPublishTrack = await Track.findById(req.params.id);

        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;