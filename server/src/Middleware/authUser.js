const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  const token = req.cookies.jwt;
 
  if (!token) {
    
    return res.status(401).json({ message: 'Unauthorized 1 there is no token'});
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    
    req.user = {"id": decoded.userId, "role": decoded.userRole};
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized 3' });
  }
};

module.exports = authUser;