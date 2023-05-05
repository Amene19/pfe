const User = require('../models/user')
const bcrypt = require('bcryptjs');

const admin = (req, res)=>{
    return res.send("you are in the admin dashboard")
}


const waitingList = async (req, res) => {
    const user = await User.find({approved: false})
    return res.json({ user});
}

const usersList = async (req, res) => {
    try {
        const user = await User.find()
        const user2 = user.filter(item => item.id != req.user.id && item.approved === true)
        return res.json({user2});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    
}

const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        return res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
 
const approveUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(id,
          { approved: true },
          { new: true}
        );
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        res.send(user);
    }catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

const rejectUser = async (req, res) => {
    const email = req.body.email
    try {
        const user = await User.deleteOne(
            {email: email}
        )
        if (!user){
            return res.status(404).send('User not found')
        }
        res.send(user)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

const addUser = async (req, res) => {
    const {firstname , lastname, email, password, role} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ firstname:firstname, lastname:lastname, email, password:hashedPassword, role, approved:true});      
        const test = await user.save();
        console.log("test",test)
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
            res.status(400).send('Email address already exists');
          } else {
            console.log(error)
            res.status(500).send('Server error here');
          }
    }
}

const editUser = async (req, res) => {
    const id = req.params.id;
    const { firstname, lastname,  email, password, role, approved } = req.body;
  
    try {
      const userUpdates = {};
      if (firstname) userUpdates.firstname = firstname;
      if (lastname) userUpdates.lastname = lastname;
      if (email) userUpdates.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        userUpdates.password = hashedPassword;
      }
      if (role) userUpdates.role = role;
      if (approved !== undefined) userUpdates.approved = approved;
  
      const user = await User.findByIdAndUpdate(id, userUpdates, { new: true });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
};


  

const deleteUser = async (req, res) => {
    const id = req.params.id 
    try {
        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
          return res.status(404).send('User not found');
        }
    
        res.send('User deleted successfully');
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = {
    admin, 
    waitingList,
    approveUser,
    usersList,
    rejectUser,
    addUser,
    editUser,
    deleteUser,
    getUser,
}