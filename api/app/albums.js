const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Album = require("../models/Album");

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

        const albums = await Album.find(query).populate("artist", "name information image");

        return res.send(albums);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(album);
    } catch (e) {
        next(e);
    }
});

module.exports = router;