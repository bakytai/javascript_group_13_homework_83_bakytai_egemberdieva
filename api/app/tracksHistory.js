const express = require('express');
const auth = require("../middleware/auth");
const TrackHistory = require("../models/TrackHistory");
const Track = require("../models/Track");

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
    try {
        const date = new Date().toString();

        const trackHistoryData = {
            user: req.user._id,
            track: req.body.trackId,
            dateTime: date,
        };

        const trackHistory = new TrackHistory(trackHistoryData);

        await trackHistory.save();

        console.log(trackHistory);

        return res.send(trackHistory)

    } catch (e) {
        next(e)
    }
});


router.get('/', auth, async (req, res, next) => {
    try {
        const query = {};
        const newObj = {};

        if (req.user) {
            query.artist = req.user._id;
        }

        const trackHistory = await TrackHistory.find(query);

        res.send(trackHistory);

    } catch (e) {
        next(e)
    }
});

module.exports = router;
