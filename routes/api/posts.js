
// const express = require('express-validator');
// const router = express.Router();
// const {
//     check,
//     validationResult
// } = require('express-validator');


// const auth = require('../../middleware/auth');
// const Post = require('../../models/Post');
// const User = require('../../models/User');


// // @route   GET api/users
// // @desc    create a post
// // @access  Private


// // router.get('/', (req, res) => res.send('Posts route'));
// // module.exports = router;

// router.post('/' [auth, [check('text', 'Text is required').not().isEmpty]],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() })
//         }
//         try {
//             const user = await (await User.findById(req.user.id)).selected('-password');

//             const newPost = new Post({
//                 user: req.user.id,
//                 name: user.name,
//                 username: user.username,
//                 title: req.title,
//                 text: req.body.text
//             });

//             const post = await newPost.save();

//             res.json(post);
//         } catch(err) {
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// // @route GET api/posts
// // @desc Get all posts
// // @access Private

// router.get('/', auth, async (req, res) => {
//     try {
//         const posts = await Post.find().sort({date: -1});
//         res.json(posts);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error')
//     }
// })

// // @route GET api/posts/:id
// // @desc Get post by ID
// // @access Private

// router.get('/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id)
//         res.json(post)
//     } catch (err) {
//         console.error(err.message);

//         res.status(500).send('Server Error')
//     }
// });

// router.delete('/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         //Checks user
//         if (post.user.toString() !== req.user.id ) {
//             return res.status(401).json({ msg: 'User not authorized'})
//         }

//         await post.remove()

//         res.json({ msg: 'Post removed'})
//     } catch (err) {
//         console.error(err.message);

//         res.status(500).send('Server Error')
//     }
// });

// // @route PUT api/posts/like/:id
// // @desc Like a post
// // @access Private

// router.put('/like/:/id', auth, async (req, res) => {});

// // @route PUT api/posts/unlike/:id
// // @desc unlike
// // @access Private

// router.put('/unlike/:id', auth, async (req, res) => {});

// // @route POST api/posts/comment/:id
// // @desc Comment on a post
// // @access Private

// router.post('/comment/:id', auth, async (req, res) => {});

// // @route DELETE api/posts/comment/:id/:comment_id
// // @desc Delete  comment
// // @access Private 

// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {})

// module.exports = router;