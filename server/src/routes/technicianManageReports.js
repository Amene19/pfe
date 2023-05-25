const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const {getAllCompanies, getCompany, createReport, getAllReports, deleteReport, getReport, editReport } = require('../controllers/technicianManageReports.js');


const router = express.Router();
router.get('/allCompanies', authUser, authRole('technician'), getAllCompanies)
router.get('/getCompany/:id', authUser, authRole('technician'), getCompany)
router.post('/create', authUser, authRole('technician'), createReport)
router.get('/allReports', authUser, authRole('technician'), getAllReports)
router.delete('/delete/:id', authUser, authRole('technician'), deleteReport)
router.get('/getReport/:id', authUser, authRole('technician'), getReport)
router.put('/editReport/:id', authUser, authRole('technician'), editReport)




module.exports = router