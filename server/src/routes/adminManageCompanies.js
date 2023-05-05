const express = require('express');

const authRole = require('../Middleware/authRole');
const authUser = require('../Middleware/authUser.js');
const { manageCompanies, createCompany, getAllCompanies, getCompany, editCompany, deleteCompany } = require('../controllers/adminManageCompaniesController');


const router = express.Router();


router.get('/', authUser, authRole('admin'), manageCompanies)
router.post('/create', authUser, authRole('admin'), createCompany)
router.get('/allCompanies', authUser, authRole('admin'), getAllCompanies)
router.get('/getCompany/:id', authUser, authRole('admin'), getCompany)
router.put('/editCompany/:id', authUser, authRole('admin'), editCompany)
router.delete('/delete/:id', authUser, authRole('admin'), deleteCompany)

module.exports = router