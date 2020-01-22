const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: String,
        unique: true
    },
    lastName: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now
}

});

module.exports = User = mongoose.model('user', UserSchema);