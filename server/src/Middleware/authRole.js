const User = require("../models/user")
const mongoose = require('mongoose')

const authRole =  (role) => {
    return async (req, res, next) => {
    
        if (req.user.role != role) {
            res.status(401)
            return res.send('Not Allowed')
        }
        
        next()
    }
}

module.exports = authRole