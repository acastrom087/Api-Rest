const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/add-product => GET
//router.get('/add-product', userController.getAddProduct);

// /admin/products => GET
router.get('/users', userController.getUsers);

// /admin/add-product => POST
router.post('/add-user', userController.postAddUser);

//router.get('/edit-product/:productId', userController.getEditProduct);

//router.post('/edit-product', userController.postEditProduct);

router.post('/delete-user', userController.postDeleteUser);

module.exports = router;