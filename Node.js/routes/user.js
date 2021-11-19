const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();


router.get('/users', userController.getUsers);

router.post('/add-user', userController.postAddUser);

router.get('/user/:userId', userController.getUser);

router.post('/edit-user', userController.postEditUser);

router.post('/delete-user', userController.postDeleteUser);

module.exports = router;