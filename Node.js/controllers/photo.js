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
            res.send("error fatal");
        });
};

exports.getAlbumPhotos = (req, res, next) => {
    const albumId = req.params.albumId;
    Photo.findById(albumId)
        .then(photos => {
            if (!photos) {
                console.log('no se encontro')
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
    const updatedPhoto = new Album(updateName, updateAlbumId, updateDescription, updateUrl, new ObjectId(id))
    updatedPhoto.save()
        .then(result => {
            res.json(result);
            console.log('Photo updated');
            
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getPhotos = (req, res, next) => {
    Photo.fetchAll()
        .then(albums => {
            res.json({albums: albums})
        });
};

exports.postDeletePhoto = (req, res, next) => {
    const id = req.body.id;
    Photo.deleteById(id)
        .then(() => {
            console.log('Deleted!');
        })
        .catch(err => console.log(err));

};