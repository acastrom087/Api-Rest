const mongodb = require('mongodb');
const Album = require('../models/album');

const ObjectId = mongodb.ObjectId;


exports.postAddAlbum = (req, res, next) => {
    const name = req.body.name;
    const userId = req.body.userId;
    const description = req.body.description;
    const album = new Album(name, userId, description);
    console.log(req.body);
    album.save()
        .then(result => {
            console.log('album created');
            res.send(album);
            
        })
        .catch(err => {
            res.send("Error fatal");
        });
};

exports.getUserAlbums = (req, res, next) => {
    const userId = req.params.userId;
    Album.findById(userId)
        .then(album => {
            if (!album) {
                res.json('No se encontro')
            }
            res.json({album})
            
        });
};

exports.postEditAlbum = (req, res, next) => {
    const updateName = req.body.name;
    const updateDescription = req.body.description;
    const updateUserId = req.body.userId;
    const id = req.body.id
    const updatedAlbum = new Album(updateName, updateUserId, updateDescription, new ObjectId(id))
    updatedAlbum.save()
        .then(result => {
            res.json(result);
            console.log('Product updated');
            
        })
        .catch(err => {
            res.json( 'Error')
        });
};

exports.getAlbums = (req, res, next) => {
    Album.fetchAll()
        .then(albums => {
            res.json({albums: albums})
        })
        .catch(err=> res.json('Error'));
};

exports.postDeleteAlbum = (req, res, next) => {
    const albumId = req.body.albumId;
    Album.deleteById(albumId)
        .then(response => {
            res.json(response);
        })
        .catch(err => res.json('Error'));

};