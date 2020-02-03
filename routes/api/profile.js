const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const Profile = require("../../models/Profile");
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const jwt = require('jsonwebtoken');
const config = require('config');


router.get('/',  async (req, res) => {
    const profiles = await Profile.find().sort({date: -1});
    res.send(profiles);
});

router.post('/me', async (req, res) => { 
    try {
        // console.log(req.body);
        const profile = await Profile.findOne({username: req.body.username})
        // const profile = await Profile.findOne({user: req.body.username})
        // const profile = await Profile.findOne({user: req.body.username})
        // const profile = await Profile.findOne(req.profile.username)
        // populate(
        //     'user',
        //     ['username']
        // );
        console.log(req.body)
        console.log("successsssss!");
        res.json(profile);
        console.log(profile);

    } catch(err) {
        console.error(err.message);
        console.log("fail!!!")
        res.status(500).send('Server Error')
    }
})


// router.get('/:username', auth, async (req, res) => {
//     try {
//         // console.log(req.body);
//         const profile = await (await Profile.findAll({user: req.body.username})
//             // ({username: req.body.profile})
//             );
//         // .populate(
//         //     'user',
//         //     ['username']
//         // );
//         console.log("successsssss1!");
//         res.json(profile);
//         console.log(req.params.username);

//     } catch(err) {
//         console.error(err.mesage);
//         console.log("fail1!!!")
//         res.status(500).send('Server Error')
//     }
// })

router.get('/:id', async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
  
      if (!profile) {
        return res.status(404).json({
          msg: 'Profile not found'
        });
      }
  
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post('/', async(req, res) => {
    const {error} = validationResult(req.body);
    if (error){
        console.log("test1");     
        return res.status(400).send(error.details[0].message)
        }
try {
    let profile = await User.findOne({username: req.body.username})
    console.log(profile)

    if(!profile) {
        console.log("Test2")
          return res
          .status(400)
          .json({ errors: [ { msg: 'Invalid Credentials'}] });
      }


    profile = new Profile ({
        username: req.body.username,
        location: req.body.location,
        bio: req.body.bio
    })
    console.log("test_2")
    
    if (profile.username == req.body.username) {
        await profile.save()
        res.send(profile)
    }
    console.log("test_3")

    } catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
    }
})



router.put('/:username', async (req, res) => {
    const { error } = validationResult(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const profile = await Profile.findOneAndUpdate(
        req.body.username,
        {
            location: req.body.location,
            bio: req.body.bio
        },
    );
    console.log("Test5");
    console.log(req.params.id);
    console.log(profile);
    if (!profile) return res.status(404).send("Invalid Credentials")
        await profile.save();
        res.send(profile);
        // alert("Profile Updated Succesfully!")
    });


router.delete('/:id', [auth], async (req, res) => {
    // try {
        const profile = await Profile.findByIdAndRemove(req.params.id)
        console.log(req.params.id)
        console.log(profile);
        if (!profile) {
            return res.status(404).json({msg: 'Profile not found'})
        }
        res.json({
            msg: 'Profile Removed'
        });
} )


  
module.exports = router
