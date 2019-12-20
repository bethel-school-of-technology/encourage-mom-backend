const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    FirstName: {
        type: DataTypes.STRING,
        unique: true
    },
    LastName: {
        type: DataTypes.STRING,
        unique: true,
    },
    Username: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
    },
    Password: {
        type: DataTypes.STRING,
        required: true
    },
    Email: {
        type: DataTypes.STRING,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        default: Date.now
}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);