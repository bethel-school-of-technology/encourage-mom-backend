const express = require("express");
const router = express.Router();
const { validationResult } = require('express-validator');
const Post = require("../../models/Post");
const auth = require('../../middleware/auth');

router.get('/', async (req, res) => {
    const posts = await Post.find().sort("title");
    res.send(posts)
});

router.post('/', async(req, res) => {
    const {error} = validationResult(req.body);
    if(error){
        console.log("Test1");
        return res.status(400).send(error.details[0].message)
    }

    try {
        let post = await User.findOne({username: req.body.username})
        console.log(post)

        if(!post) {
            console.log('Test2')
            return res
            .status(400)
            .json({ errors: [ { msg: 'Invalid Credentials'}] })
        }

        post = new Post ({
            username: req.body.username,
            title: req.body.title,
            text: req.body.text
        })
        console.log('Test3')

        if(post.username == req.body.username) {
            await post.save()
            res.send(post)
        }
        console.log('Test4')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/:id', async (req, res) => {
    const { error } = validationResult(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            text: req.body.bio
        },
        { new:true}
    );
    
    // if (!profile) return res.status(404).send("Invalid Credentials")
    // res.send(profile)
    if (post.username == req.body.username) {
        await post.save()
        res.send(post)
    } else {
        return res.status(404).send("Invalid Credentials")
    }
    console.log("test_3")
    })

module.exports = router