// encouragement model

const mongoose = require('mongoose');


const EncouragementSchema = new mongoose.Schema({
    id: {
        type: Number,
        autoIncrement: true
    },
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
        type: Date,
        default: Date.now
    }
});

module.exports = Encouragement = mongoose.model('encouragement', EncouragementSchema);


//bible verse refernece??
//title???
//text
//date