

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    title: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },
    image: String
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;