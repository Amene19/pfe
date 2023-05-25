const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstname: firstName, lastname: lastName, email, password:hashedPassword  });      
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
            res.status(400).send('Email address already exists');
          } else {
            res.status(500).send('Server error');
          }
    } 
}

const login = async (req, res) => {
    const { email, password } = req.body;

     // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send('Invalid email or password');
    }

    if (user.approved === false){
        console.log("waiting for admin to approve")
        return res.status(401).send('waiting for admin to approve')
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.SECRET_KEY);
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
    
    res.send({ token, user });
}

const logout = async (req, res) => {
    res.clearCookie('jwt');
    res.send('Logged out successfully');
}

const getUser = async (req, res) => {
    try {
      // Get the token from the cookie
      const token = req.cookies.jwt;
  
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // Get the user from the database
      const user = await User.findById(decodedToken.userId);
      // Return the user data
      res.json(user);
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  };

  const getUserRole = async (req, res) => {
    try {
        // Get the token from the cookie
        const token = req.cookies.jwt;
    
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    
        // Get the user from the database
        const user = await User.findById(decodedToken.userId);
    
        // Return the user data
        res.json({ role: user.role});
      } catch (error) {
        res.status(401).send('Unauthorized');
      }
   };

   

module.exports = {signup, login, logout, getUser, getUserRole}
