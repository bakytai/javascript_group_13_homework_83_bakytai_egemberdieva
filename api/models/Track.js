const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    trackName: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    is_published: false
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;