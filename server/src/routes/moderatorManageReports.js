const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const { getAllCompanies, getCompany } = require('../controllers/adminManageCompaniesController');
const { getReport, total, approve, reject } = require('../controllers/moderatorManageReportsController');
const {getAllReportsPosted } = require('../controllers/technicianManageReports');



const router = express.Router();

router.get('/allCompanies', authUser, authRole('moderator'), getAllCompanies)
router.get('/getCompany/:id', authUser, authRole('moderator'), getCompany)
router.get('/getReport/:id', authUser, authRole('moderator'), getReport)
router.get('/allReports', authUser, authRole('moderator'), getAllReportsPosted)
router.get('/total', authUser, authRole('moderator'), total)
router.put('/approve/:id', authUser, authRole('moderator'), approve)
router.put("/reject/:id", authUser, authRole('moderator'), reject)

module.exports = router