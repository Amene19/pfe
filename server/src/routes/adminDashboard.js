const express = require('express');
const { admin, waitingList, approveUser, usersList, rejectUser, addUser, editUser, deleteUser, getUser, changePassword } = require('../controllers/adminDashController.js');
const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');


const router = express.Router();


router.get('/', authUser, authRole('admin'), admin)
router.get('/usersList', authUser, authRole('admin'), usersList)
router.get('/waitingList', authUser, authRole('admin'), waitingList)
router.put('/approve-user/:id', authUser, authRole('admin'), approveUser)
router.delete('/reject-user', authUser, authRole('admin'), rejectUser)
router.post('/addUser', authUser, authRole('admin'), addUser)
router.put('/editUser/:id', authUser, authRole('admin'), editUser)
router.delete('/deleteUser/:id', authUser, authRole('admin'), deleteUser)
router.get('/getuser/:id', authUser, authRole('admin') , getUser)


module.exports = router