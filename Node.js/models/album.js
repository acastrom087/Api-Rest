const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class Album {
    constructor( name, userId, description,id) {
        this.name = name;
        this.userId = userId;
        this.description = description;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('albums').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            dbOp = db.collection('albums').insertOne(this);
        }
        return dbOp
            .then(result => {
                return result;
                
            })
            .catch(err => {
                console.log("ERROR")
                return err
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('albums')
            .find()
            .toArray()
            .then(albums => {
                //console.log(products);
                return albums;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('albums')
            .find({ userId: userId })
            .toArray()
            .then(albums => {
                //console.log(product);
                return albums;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteById(albumId) {
        const db = getDb();
        return db
            .collection('albums')
            .deleteOne({ _id: new mongodb.ObjectId(albumId) })
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            });
    }
}
module.exports = Album