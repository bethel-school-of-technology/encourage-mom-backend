const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User')


/* GET users listing. */
router.get('/', (req, res) => res.send('User route'));

router.post('/', [
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

// router.get('/login', function(req, res, next) {
//   res.render('login')
// })

// router.post('/login', [
//   check('Username', 'Username is Required').not().isEmpty(),
//   check('Password', 'Password is Required').not().isEmpty(),
// ], (req, res) => {

// })

 module.exports = router;
