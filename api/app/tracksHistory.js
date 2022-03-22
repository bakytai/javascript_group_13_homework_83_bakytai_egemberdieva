const express = require('express');
const auth = require("../middleware/auth");
const TrackHistory = require("../models/TrackHistory");

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
    try {
        const date = new Date().toISOString();

        const trackHistoryData = {
            user: req.user._id,
            track: req.body.trackId,
            dateTime: date,
        };

        const trackHistory = await new TrackHistory(trackHistoryData);

        trackHistory.save();

        return res.send(trackHistory)
    } catch (e) {
        next(e)
    }
});


router.get('/', auth, async (req, res, next) => {
    try {
        const query = {};

        if (req.user) {
            query.user = req.user._id;
        }

        const trackHistory = await TrackHistory.find(query).sort({_id: -1}).populate({
            path:  "track"  ,
            select: 'trackName',
            populate: {
                path:  'album',
                select: 'artist',
                populate: {
                    path: 'artist',
                    select: 'name',
                }
            }
        });


        res.send(trackHistory);
    } catch (e) {
        next(e)
    }
});

module.exports = router;
