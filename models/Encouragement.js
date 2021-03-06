const mongoose = require('mongoose');

const EncouragementSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    text: {
        type: String,
        unique: true,
        required: true
    },
    reference: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = Encouragement = mongoose.model('encouragement', EncouragementSchema);
