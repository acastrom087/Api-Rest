const { json } = require('body-parser');
const mongodb = require('mongodb');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('../util/jwt');

const ObjectId = mongodb.ObjectId;


exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    bcryptjs.hash(password, 10, (e, hash) => {
        if (e) {
            res.json({e});
        } else {
            const user = new User(name, lastName, email, hash, birthday, gender);
            user.save()
                .then(user => {
                    res.json(user);
                })
                .catch(err => {
                    console.log(err);
                    res.json(err);
                });
        }
    })
};

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            if (!user) {
                res.json({error: 'User not found'})
            }else{
            res.json({user})
        }
            
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
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
  
    
}

exports.getUsers = (req, res, next) => {
    User.fetchAll()
        .then(users => {
            res.json({users: users})
        })
        .catch(err => {res.json({err:'Usuarios no encontrados'})});
        
};

exports.postDeleteUser = (req, res, next) => {
    const userId = req.body.id;
    User.deleteById(userId)
        .then(() => {
            console.log('Deleted!');
        })
        .catch(err => res.json({ err: 'Error al eliminar' }));

};

exports.loginUser = (req, res) => {
    User.findByEmail(req.body.email)
    .then(user => {
        if (!user) {
            res.json(null);
            
        } else {
            bcryptjs.compare(req.body.password, user.password, function(e, match) {
                if (e) {
                    res.json(null);
                } else if (match) {
                    res.json({token: jwt.createToken(user)});
                } else {
                    res.json(null);
                }
            });
        }
    })
    .catch(e => {
        res.json({e});
    });
    
};
