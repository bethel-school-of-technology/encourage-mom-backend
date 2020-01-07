const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    FirstName: {
        type: String,
        unique: true
    },
    LastName: {
        type: String,
        unique: true,
    },
    Username: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: String,
        default: Date.now
}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
