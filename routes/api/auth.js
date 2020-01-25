
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
        console.log(user);
      } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public


router.post('/', 
   async (req, res) => {
        const errors = validationResult(req.body)
        if(!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }

        user = await User.findOne({ username: req.body.username});
          console.log("Test")
          console.log(user)

        if(!user) {
          console.log("Test2")
            return res
            .status(400)
            .json({ errors: [ { msg: 'Invalid Credentials'}] });
        }


    const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res
            .status(400)
            .json({ errors: [ { msg: 'Username or Password is wrong'}] });
          }
          

        const payload = {
          user: {
            id: user.id
          }
        }

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {expiresIn: 360000},
          (err, token) => {
            if(err) throw err;
            res.json({ token });
      })
  })

module.exports = router;