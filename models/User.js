<<<<<<< HEAD
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
     UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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


=======
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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

>>>>>>> dev
module.exports = User = mongoose.model('user', UserSchema);