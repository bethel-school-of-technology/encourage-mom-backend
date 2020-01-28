const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const Profile = require("../../models/Profile");
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/',  async (req, res) => {
    const profiles = await Profile.find().sort("name");
    res.send(profiles);
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
        bio: req.body.location
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

router.put('/:id', async (req, res) => {
    const { error } = validationResult(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const profile = await Profile.findByIdAndUpdate(
        req.params.id,
        {
            location: req.body.location,
            bio: req.body.bio
        },
        { new:true}
    );
    
    // if (!profile) return res.status(404).send("Invalid Credentials")
    // res.send(profile)
    if (profile.username == req.body.username) {
        await profile.save()
        res.send(profile)
    } else {
        return res.status(404).send("Invalid Credentials")
    }
    console.log("test_3")
    })

module.exports = router