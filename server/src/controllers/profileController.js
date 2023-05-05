const User = require('../models/user')
const cloudinary = require('../utils/cloudinary')
const bcrypt = require('bcryptjs');

const showProfile = async (req, res) => {
  const id = req.params.id
  try {
      const user = await User.findById(id)
      return res.json(user)
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
}


const editProfile = async (req, res) => {
  const id = req.params.id;
    const { firstname, lastname,  email, image } = req.body;
  
    try {
      const userUpdates = {};
      if (image) { 
        const result = await cloudinary.uploader.upload(image, {
          folder: "profile"
        })
        userUpdates.image = {public_id: result.public_id,
          url: result.secure_url
        }
      }
        
      
      if (firstname) userUpdates.firstname = firstname;
      if (lastname) userUpdates.lastname = lastname;
      if (email) userUpdates.email = email;
   
      const user = await User.findByIdAndUpdate(id, userUpdates, { new: true });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
}

const changePassword = async (req, res) => {
  const id = req.params.id
  const {currentpassword, newpassword} = req.body
  try {
      const user = await User.findById(id)
      const isOldPasswordValid = await bcrypt.compare(currentpassword, user.password);
      if (!isOldPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
      }
      const hashedPassword = await bcrypt.hash(newpassword, 10)
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
  } catch (error){
      console.error(error);
      res.status(500).send("Server error");
  }
}

module.exports = {showProfile, editProfile, changePassword}