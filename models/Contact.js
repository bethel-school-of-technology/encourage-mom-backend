const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    comments: {
        type: String,
        unique: true,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);
