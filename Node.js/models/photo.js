const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class Photo {
    constructor( name, albumId, description, url,id) {
        this.name = name;
        this.albumId = albumId;
        this.description = description;
        this.url = url;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('photos').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            dbOp = db.collection('photos').insertOne(this);
        }
        return dbOp
            .then(result => {
                return result;
                
            })
            .catch(err => {
                return err
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('photos')
            .find()
            .toArray()
            .then(photos => {
                //console.log(products);
                return photos;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(albumId) {
        const db = getDb();
        return db.collection('photos')
            .find({ albumId: albumId })
            .toArray()
            .then(photos => {
                //console.log(product);
                return photos;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteById(id) {
        const db = getDb();
        return db
            .collection('photos')
            .deleteOne({ _id: new mongodb.ObjectId(id) })
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            });
    }
}
module.exports = Photo;