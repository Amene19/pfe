const mongoose = require('mongoose')

const missionSchema = new mongoose.Schema({
    missionTitle: {
        type: String,
        require: true,
    },
    assignee: {
        type: String,
        require: true,
    },
    target: {
        type: String,
        require: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String
    },
    role: {
        type: String
    },
})

module.exports = mongoose.model('Mission', missionSchema)