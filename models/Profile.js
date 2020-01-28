const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        unique: true,
        required: true,
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
