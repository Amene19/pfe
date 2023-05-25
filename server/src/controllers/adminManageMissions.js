
const Mission = require('../models/mission')
const User = require('../models/user')


const addMission = async (req, res) => {
    const {assignee , deadline, missionTitle, target} = req.body
    try {
        const user = await User.findOne({ email: assignee });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
        const mission = new Mission({assignee , deadline, missionTitle, target, role: user.role, userId: user._id ,status:false});      
        const test = await mission.save();
        console.log("test",test)
        res.status(201).json({ message: 'Mission created successfully' });
    } catch (error) {
    
            console.log(error)
            res.status(500).send('Server error here');
    }
}


const getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.find()
        return res.json({missions});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    
}


const deleteMission = async (req, res) => {
    const id = req.params.id 
    try {
        const result = await Mission.deleteOne({ _id: id });
  
        if (result.deletedCount === 0) {
          return res.status(404).send('Mission not found');
        }
    
        res.send('Mission deleted successfully');
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
  }

module.exports = {
    addMission,
    getAllMissions,
    deleteMission
}