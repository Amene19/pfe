const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const { getUserMissions, missionComplete } = require('../controllers/techMissionsController');




const router = express.Router();

router.get('/userMissions/:id', authUser, authRole('technician'), getUserMissions)
router.put('/status/:id', missionComplete)


module.exports = router