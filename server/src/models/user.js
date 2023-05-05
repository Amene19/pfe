const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'technician', 'moderator'],
        default: 'technician'
    },
    approved: {
        type: Boolean,
        default: false
    },
    image: {
        public_id :{
            type: String,
            
        },
        url: {
            type: String,
           
        }
        
    }
})

module.exports = mongoose.model('User', userSchema)