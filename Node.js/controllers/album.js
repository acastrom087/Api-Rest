const mongodb = require('mongodb');
const Album = require('../models/album');

const ObjectId = mongodb.ObjectId;


exports.postAddAlbum = (req, res, next) => {
    const name = req.body.name;
    const userId = req.body.userId;
    const description = req.body.description;
    const album = new Album(name, userId, description);
    album.save()
        .then(result => {
            console.log('album created');
            res.send(result);
            
        })
        .catch(err => {
            console.log(err);
            res.send("error fatal");
        });
};

exports.getAlbums = (req, res, next) => {
    const userId = req.params.userId;
    Album.findById(userId)
        .then(album => {
            if (!album) {
                console.log('no se encontro')
            }
            res.json({album})
            
        });
};

exports.postEditAlbum = (req, res, next) => {
    const updateName = req.body.name;
    const updateDescription = req.body.description;
    const albumId = req.body.albumID;
    const updatedAlbum = new Album(updateName, updateDescription, albumId)
    updatedAlbum.save()
        .then(result => {
            res.json(result);
            console.log('Product updated');
            
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAlbums = (req, res, next) => {
    Album.fetchAll()
        .then(albums => {
            res.json({albums: albums})
        });
};

exports.postDeleteAlbum = (req, res, next) => {
    const albumId = req.body.albumId;
    Album.deleteById(albumId)
        .then(() => {
            console.log('Deleted!');
        })
        .catch(err => console.log(err));

};