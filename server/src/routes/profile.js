const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authUser = require('../Middleware/authUser');




router.get('/profile/:id', authUser, profileController.showProfile)
router.put("/edit/:id", authUser, profileController.editProfile)
router.put('/changePassword/:id', authUser, profileController.changePassword)
module.exports = router;

