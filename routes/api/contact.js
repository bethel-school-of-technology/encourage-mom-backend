const express = require("express");
const router = express.Router();
const { validationResult } = require('express-validator');
const Contact = require("../../models/Contact");
const auth = require('../../middleware/auth');


router.get('/', async (req, res) => {
    const contacts = await Contact.find().sort(({date: 1}));
    res.send(contacts)
});

// router.get('/:id', async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);

//       if (!post) {
//         return res.status(404).json({
//           msg: 'Post not found'
//         });
//       }

//       res.json(post);
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send('Server Error');
//     }
//   });


router.post('/', async(req, res) => {
    const {error} = validationResult(req.body);
    if(error){
        console.log("Test1");
        return res.status(400).send(error.details[0].message)
    }

    try {
        contact = new Contact ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            comments: req.body.comments
        })
        console.log('Test3')
        await contact.save()
        res.send()
        alert("Message successful!")
        console.log('Success')
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    }
)


router.put('/:id', async (req, res) => {
    const { error } = validationResult(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            text: req.body.text
        },
    );
    console.log("Test5");
    console.log(req.params.id);
    console.log(post);
    if (!post) return res.status(404).send("Invalid Credentials")
    post.save()
    res.send(post)
})
router.delete('/:id', [auth], async (req, res) => {
    // try {
        const post = await Post.findByIdAndRemove(req.params.id)
        console.log(req.params.id)
        console.log(post);
        if (!post) {
            return res.status(404).json({msg: 'Post not found'})
        }
        res.json({
            msg: 'Post Removed'
        });
} )




module.exports = router