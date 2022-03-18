const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Album = require("../models/Album");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const query = {};

        if (req.query.artist) {
            query.artist = req.query.artist;
        }

        const albums = await Album.find(query).populate("artist", "name");

        return res.send(albums);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async ( req, res, next) => {
    try {
        const album = await Album.findById(req.params.id).populate("artist", "name information image");

        if (!album) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(album);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.year || !req.body.artist) {
            return res.status(400).send({message: 'Title or year, or arist are required'});
        }

        const albumData = {
            artist: req.body.artist,
            title: req.body.title,
            year: req.body.year,
            image: null,
        };

        if (req.file) {
            albumData.image = req.file.filename;
        }

        const album = new Album(albumData);

        await album.save();

        return res.send({message: 'Created new album', id: album._id});
    } catch (e) {
        next(e);
    }
});

module.exports = router;