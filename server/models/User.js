const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255
    },
    branch_name: {
        type: String,
        required: true,
        max: 255
    },
    branch_number: {
        type: Number,
        required: true,
        max: 100
    },
    password: {
        type: String,
        required: true,
        max: 1024
    }
});

module.exports = mongoose.model('User', userSchema);