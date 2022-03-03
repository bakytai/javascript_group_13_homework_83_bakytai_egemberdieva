const express = require('express');
const auth = require("../middleware/auth");
const TrackHistory = require("../models/TrackHistory");

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
    try {
        const date = new Date().toString();

        const trackHistoryData = {
            user: req.user._id,
            track: req.body.track,
            dateTime: date,
        };

        const trackHistory = new TrackHistory(trackHistoryData);

        await trackHistory.save();

        return res.send({message: 'Track history saved'})

    } catch (e) {
        next(e)
    }
});

module.exports = router;
