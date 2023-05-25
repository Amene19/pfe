const Report = require('../models/report')
const Company = require('../models/company')


const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({ posted: true });
        return res.json({ reports });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}


const getReport = async (req, res) => {
    const id = req.params.id
    try {
        const report = await Report.findById(id)
        return res.json(report)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
  }

module.exports = {
    getAllReports,
    getReport
}