const express = require("express");
const router = express.Router();
const { validationResult } = require('express-validator');
const Contact = require("../../models/Contact");
const auth = require('../../middleware/auth');


router.get('/', async (req, res) => {
    const contacts = await Contact.find().sort(({date: 1}));
    res.send(contacts)
});

router.post('/', async(req, res) => {
    const {error} = validationResult(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    try {
        contact = new Contact ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            comments: req.body.comments
        })
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
    console.log(req.params.id);
    console.log(post);
    if (!post) return res.status(404).send("Invalid Credentials")
    post.save()
    res.send(post)
})

router.delete('/:id', async (req, res) => {
        const contact = await Contact.findByIdAndRemove(req.params.id)
        console.log(req.params.id)
        console.log(contact);
        if (!contact) {
            return res.status(404).json({msg: 'Message not found'})
        }
        res.json({
            msg: 'Post Removed'
        });
} )


module.exports = router