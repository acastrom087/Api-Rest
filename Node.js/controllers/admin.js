const mongodb = require('mongodb');
const User = require('../models/user');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

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
            res.json({result});
            //res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.json({err});
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            if (!user) {
                console.log('no se encontro')
            }
            res.json("Producto editado")
            
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        updatedTitle,
        updatedPrice,
        updatedDesc,
        updatedImageUrl,
        new ObjectId(prodId)
    );
    updatedProduct.save().then(result => {
            console.log('Product updated');
            res.redirect('/admin/products');
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

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('Deleted!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

};