
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {  validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post')


// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['firstName', 'lastName']);
     
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    }   catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth,
async (req, res) => {
    const errors = validationResult(req.body);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const {
            location,
            bio,
            status
        } = req.body;

//Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (location) profileFields.location= location;
        if (bio) profileFields.bio= bio;
        // if (status) profileFields.status= status;

        try {
            // let profile = await Profile.findOne({ user: req.user.id });

            let profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true, upsert: true }
                ); 
                res.json(profile);
            } catch(err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
    );  
            // //Create
            // profile = new Profile(profileFields);

            // await profile.save();
            // res.json(profile);

// @route   GET api/profile
// @desc    GET all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['firstName', 'lastName']);
        res.json(profiles);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    GET profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (error) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    DELETE profile, user and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove users posts

        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/experience
// @desc    PUT profile experiences
// @access  Private
//Did not add profile experience here because our app differs from video

module.exports = router;
