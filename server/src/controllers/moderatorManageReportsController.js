const Report = require('../models/report')
const Company = require('../models/company')
const User = require('../models/user')

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

  const approve = async (req, res) => {
    const id = req.params.id;
    try {
      const report = await Report.findByIdAndUpdate(id, { approved: true });
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      report.approved = true;
      report.rejected = false
      await report.save();
      res.json(report);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };

  const reject = async (req, res) => {
    const id = req.params.id;
    const {comment} = req.body
    try {
      const report = await Report.findByIdAndUpdate(id, { rejected: true });
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      report.rejected = true;
      report.submited = false
      report.comment = comment
      await report.save();
      res.json(report);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };

  const total = async (req, res) => {
    try {
      const reports = await Report.countDocuments();
      const companies = await Company.countDocuments();
      const users = await User.countDocuments();
  
      return res.json({ reports, companies, users });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

module.exports = {
    getAllReports,
    getReport,
    approve,
    reject,
    total
}