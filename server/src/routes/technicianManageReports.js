const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const {getAllCompanies, getCompany, createReport } = require('../controllers/technicianManageReports.js');


const router = express.Router();
router.get('/allCompanies', authUser, authRole('technician'), getAllCompanies)
router.get('/getCompany/:id', authUser, authRole('technician'), getCompany)
router.post('/create', authUser, authRole('technician'), createReport)






module.exports = router