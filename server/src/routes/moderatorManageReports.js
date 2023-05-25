const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const { getAllCompanies, getCompany } = require('../controllers/adminManageCompaniesController');
const { getReport } = require('../controllers/moderatorManageReportsController');
const {getAllReportsPosted } = require('../controllers/technicianManageReports');



const router = express.Router();

router.get('/allCompanies', authUser, authRole('moderator'), getAllCompanies)
router.get('/getCompany/:id', authUser, authRole('moderator'), getCompany)
router.get('/getReport/:id', authUser, authRole('moderator'), getReport)
router.get('/allReports', authUser, authRole('moderator'), getAllReportsPosted)

module.exports = router