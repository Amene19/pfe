const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const { addMission, getAllMissions, deleteMission } = require('../controllers/adminManageMissions');



const router = express.Router();

router.post('/add', authUser, authRole('admin'), addMission)
router.get('/all', authUser, authRole('admin'), getAllMissions)
router.delete("/delete/:id", authUser, authRole("admin"), deleteMission)


module.exports = router