const mongodb = require('mongodb');
const User = require('../models/user');

const ObjectId = mongodb.ObjectId;


exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const user = new User(name, lastName, email, password, birthday, gender);
    user.save()
        .then(result => {
            console.log('User created');
            res.send(result);
            //res.redirect('/' )
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
};

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            if (!user) {
                console.log('no se encontro')
            }
            res.json({user})
            
        });
};

exports.postEditUser = (req, res, next) => {
    const userId = req.body.id;
    const updatedName = req.body.name;
    const updatedLastName = req.body.lastName;
    const updatedEmail = req.body.email;
    const updatedPassword = req.body.password;
    const updatedBirthday = req.body.birthday;
    const updatedGender = req.body.gender;
    const updatedUser = new User(
        updatedName,
        updatedLastName,
        updatedEmail,
        updatedPassword,
        updatedBirthday,
        updatedGender,
        new ObjectId(userId)
    );
    updatedUser.save()
        .then(result => {
            res.json(result);
            console.log('Product updated');
            
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getUsers = (req, res, next) => {
    User.fetchAll()
        .then(users => {
            res.json({users: users})
        });
};

exports.postDeleteUser = (req, res, next) => {
    const userId = req.body.id;
    User.deleteById(userId)
        .then(() => {
            console.log('Deleted!');
        })
        .catch(err => console.log(err));

};