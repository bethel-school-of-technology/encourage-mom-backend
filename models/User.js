const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // UserId: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,

    // },
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
        type: Date,
        default: Date.now
}

});

module.exports = User = mongoose.model('user', UserSchema);