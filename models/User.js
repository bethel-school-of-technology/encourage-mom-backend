// import { Schema } from "mongoose";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    firstName: {
        type: String,
        unique: true,
        required: true
    },
    lastName: {
        type: String,
        unique: true,
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
    },
    date: {
        type: Date,
        default: Date.now
}
});

module.exports = User = mongoose.model('user', UserSchema, 'user');

// // const UserModel = mongoose.model('User', new Schema({
// //     name: String,
// //     email: {
// //       type: String,
// //       unique: true
// //     }
// //   }));
  
//   // Wait for the index to build. The index name will be `email_1`
//   await User.init();
  
//   // Create a document with no `email` set
//   await User.create({ name: 'user 1' });
  
//   try {
//     await User.create({ name: 'user 2' });
//   } catch (error) {
//     // E11000 duplicate key error collection: test.users index: email_1
//     // dup key: { : null }
//     error.message;
//   }



// const UserSchema = mongoose.model('User', new Schema({
//         // user: {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'user'
//     // },
//     firstName: {
//         type: String,
//         // unique: true
//     },
//     lastName: {
//         type: String,
//         // unique: true,
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
//     date: {
//         type: Date,
//         default: Date.now
// }
// }))

// const schema = new Schema({ name: String });
// schema.plugin(require('mongoose-beautiful-unique-validation'));

// const CharacterModel = mongoose.model('Character', schema);

// const doc = await CharacterModel.create({ name: 'Jon Snow' });

// try {
//   // Try to create a document with the same `_id`. This will always fail
//   // because MongoDB collections always have a unique index on `_id`.
//   await CharacterModel.create(Object.assign({}, doc.toObject()));
// } catch (error) {
//   // Path `_id` (5cc60c5603a95a15cfb9204d) is not unique.
//   error.errors['_id'].message;
// }

