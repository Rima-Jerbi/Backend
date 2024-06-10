const mongoose = require("mongoose");
const validator = require('validator');
const Roles = require('./role');

const userSchema = mongoose.Schema({
    FullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    photo: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.user,
    },
    username: {
        type: String,
    },
    Phone: {
        type: Number
    },
    serialNumber: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
