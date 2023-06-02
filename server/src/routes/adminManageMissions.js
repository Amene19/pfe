const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const { addMission, getAllMissions, deleteMission, total } = require('../controllers/adminManageMissions');



const router = express.Router();

router.post('/add', authUser, authRole('admin'), addMission)
router.get('/all', authUser, authRole('admin'), getAllMissions)
router.delete("/delete/:id", authUser, authRole("admin"), deleteMission)
router.get('/total', authUser, authRole('admin'), total)


module.exports = router