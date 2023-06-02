const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const { getUserMissions, missionComplete, total } = require('../controllers/techMissionsController');




const router = express.Router();

router.get('/userMissions/:id', authUser, authRole('technician'), getUserMissions)
router.put('/status/:id', missionComplete)
router.get('/total', authUser, authRole('technician'), total)


module.exports = router