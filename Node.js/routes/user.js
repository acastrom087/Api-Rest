const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/add-product => GET
//router.get('/add-product', userController.getAddProduct);

// /admin/products => GET
router.get('/users', userController.getUsers);

// /admin/add-product => POST
router.post('/add-user', userController.postAddUser);

router.get('/user/:userId', userController.getUser);

router.post('/edit-user', userController.postEditUser);

router.post('/delete-user', userController.postDeleteUser);

module.exports = router;