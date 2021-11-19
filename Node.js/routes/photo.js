const express = require('express');

const photoController = require('../controllers/photo');

const router = express.Router();


router.get('/photos', photoController.getPhotos);

router.post('/add-photo', photoController.postAddPhoto);

router.get('/photo/:albumId', photoController.getAlbumPhotos);

router.post('/edit-photo', photoController.postEditPhoto);

router.post('/delete-photo', photoController.postDeletePhoto);

module.exports = router;