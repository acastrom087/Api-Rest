const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class User {
    constructor(name, lastName, email, password, birthday, gender ,id) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            dbOp = db.collection('users').insertOne(this);
        }
        return dbOp
            .then(result => {
                return result;
                console.log(result);
            })
            .catch(err => {
                return err
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('users')
            .find()
            .toArray()
            .then(users => {
                //console.log(products);
                return users;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .find({ _id: new mongodb.ObjectId(userId) })
            .next()
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteById(userId) {
        const db = getDb();
        return db.collection('users')
            .deleteOne({ _id: new mongodb.ObjectId(userId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }

    static find(data) {
        const db = getDb();
        return db.collection('users')
            .find({email: data})
            .next()
            .then(user => {
                // console.log(user);
                return user;
            });
    };

};

module.exports = User;