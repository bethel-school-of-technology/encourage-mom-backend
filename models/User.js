// import { Schema } from "mongoose";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    }
    // ,
    // isAdmin: Boolean
});

module.exports = User = mongoose.model('user', UserSchema);


// const config = require("config");
// const jwt = require('jsonwebtoken');
// const Joi = require("joi");
// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     lastName: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     username: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//     },
//     isAdmin: Boolean
// });

// UserSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign (
//         {_id: this._id, isAdmin: this.isAdmin},
//         config.get("jwtPrivateKey")
//     )
//     return token;
// }

// const User = mongoose.model("User", UserSchema)

// function validateUser(user) {
    //     const schema = {
//         firstName: Joi.string()
//             .required(),
//         lastName: Joi.string()
//             .required(),
//         email: Joi.string()
//             .required()
//             .email(),
//         username: Joi.string()
//             .required(),
//         passowrd: Joi.string()
//             .required()
//             .min(6)
//     };
//     return Joi.validate(user, schema);
// }

// exports.User = User;
// export.validate = validateUser;  
