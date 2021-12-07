const mongodb = require('mongodb');
const Photo = require('../models/photo');

const ObjectId = mongodb.ObjectId;


exports.postAddPhoto = (req, res, next) => {
    const name = req.body.name;
    const albumId = req.body.albumId;
    const description = req.body.description;
    const url = req.body.url;
    const photo = new Photo(name, albumId, description, url);
    photo.save()
        .then(result => {
            console.log('photo created');
            res.json(photo);
            
        })
        .catch(err => {
            console.log(err);
            res.send("Error fatal");
        });
};

exports.getAlbumPhotos = (req, res, next) => {
    const albumId = req.params.albumId;
    Photo.findById(albumId)
        .then(photos => {
            if (!photos) {
                res.json('Error')
            }
            res.json({photos})
            
        });
};

exports.postEditPhoto = (req, res, next) => {
    const updateName = req.body.name;
    const updateAlbumId = req.body.albumId;
    const updateDescription = req.body.description;
    const updateUrl = req.body.url;
    const id = req.body.id
    const updatedPhoto = new Photo(updateName, updateAlbumId, updateDescription, updateUrl, new ObjectId(id))
    console.log(updatedPhoto)
    updatedPhoto.save()
        .then(result => {
            res.json(result);
            
            
        })
        .catch(err => {
            res.json('Error');
        });
};

exports.getPhotos = (req, res, next) => {
    Photo.fetchAll()
        .then(albums => {
            res.json({albums: albums})
        })
        .catch(err => {res.json('Error')});
};

exports.postDeletePhoto = (req, res, next) => {
    const id = req.body.id;
    Photo.deleteById(id)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json('Error');
        });

};