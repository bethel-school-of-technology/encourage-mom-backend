// const Joi = require("@hapi/joi");

// // register validation

// const registerValidation = data => {
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
//     return Joi.validate(data, schema)
// };

// const loginValidation = data => {
//     const schema = {
//         username: Joi.string()
//         .required(),
//     passowrd: Joi.string()
//         .required()
//         .min(6)
//     };
//     return Joi.validate(data, schema)
// };

// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;