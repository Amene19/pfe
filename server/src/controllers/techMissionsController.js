

const Report = require('../models/report')
const Mission = require('../models/mission')
const User = require('../models/user')
const Company = require('../models/company')





const getUserMissions = async (req, res) => {
    try {
        const id = req.params.id; // Assuming the user ID is available as a route parameter

        const missions = await Mission.find({ userId: id }); // Replace 'userId' with the actual field name in the Mission schema that represents the user ID

        return res.json({ missions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    
}

const missionComplete = async (req, res) => {
    try {
        const id = req.params.id;
        const mission = await Mission.findByIdAndUpdate(id, { status: true }, { new: true });

        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        return res.json({ mission });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

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



module.exports = {getUserMissions, missionComplete, total}