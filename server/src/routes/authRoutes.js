const express = require('express');
const router = express.Router();
const UserController = require('../controllers/authController');



// Create a new user
router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/user', UserController.getUser)
router.get('/userRole', UserController.getUserRole)


module.exports = router;