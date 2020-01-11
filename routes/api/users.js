<<<<<<< HEAD
const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const {
    check,
    validationResult
} = require('express-validator/check');
const User = require('../../models/User');

// @route   GET api/users
// @desc    Register user
// @access  Public
router.post('/',
    [
        check('name', 'Name is required')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({
            min: 6
        })

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                email
            });

            if (user) {
                res.status(400).json({
                    errors: [{
                        msg: 'User already exsits'
                    }]
                });
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            const salt = await bcrypt.genSalt(10);

            user.password = await bcryptjs.hash(password, salt);

            await user.save();

            //return jsonwebtoken

            res.send('User registered');
        } catch (err) {
            console.error(err.message);
        }
    }
);

module.exports = router;
=======

var express = require('express');
var router = express.Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//This Error thrown in Terminal so updated below: express-validator: requires to express-validator/check are deprecated.You should just use require("express-validator") instead.
const { check, validation } = require('express-validator');

const User = require('../../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup')
})

router.post('/signup', [
  check('FirstName', 'First Name is required').not().isEmpty(),
  check('LastName', 'Last Name is required').not().isEmpty(),
  check('Email', 'Please include a valid email').not().isEmpty(),
  check('Username', 'Username is Required').not().isEmpty(),
  check('Password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
 async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {FirstName, LastName, Email, Username, Password } = req.body;

    try {
      let user = await User.findOne({ email })

      if(user) {
        res.status(400).json({ errors: [ { msg: 'User already exists'}] });
      }

      user = new User ({
          FirstName,
          LastName,
          Email,
          Username,
          Password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000}),
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }

    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
      res
    }
})

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.post('/login', [
  check('Username', 'Username is Required').not().isEmpty(),
  check('Password', 'Password is Required').not().isEmpty(),
], (req, res) => {

})

 module.exports = router;

>>>>>>> 32a37122b930af4ff9f95552f27614c603198062
