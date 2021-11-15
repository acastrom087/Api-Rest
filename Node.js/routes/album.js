const express = require('express');

const albumController = require('../controllers/album');

const router = express.Router();


router.get('/albums', albumController.getAlbums);

router.post('/add-album', albumController.postAddAlbum);

router.get('/album/:userId', albumController.getAlbums);

router.post('/edit-album', albumController.postEditAlbum);

router.post('/delete-album', albumController.postDeleteAlbum);

module.exports = router;