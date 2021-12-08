const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://gil:rbmb6WesVQksoIYr@cluster0.wiyo4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(client => {
            console.log(client);
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            console.log('No se conecto')
            throw err;
        });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;