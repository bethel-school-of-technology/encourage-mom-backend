var express = require('express');
var router = express.Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//This Error thrown in Terminal so updated below: express-validator: requires to express-validator/check are deprecated.You should just use require("express-validator") instead.
const {check, validationResult } = require('express-validator');
const User = require('../../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/signup', function(req, res, next) {
//   res.render('signup')
// })

router.post('/signup', 

// [
//   check('firstName', 'First Name is required').not().isEmpty(),
//   check('lastName', 'Last Name is required').not().isEmpty(),
//   check('email', 'Please include a valid email').not().isEmpty(),
//   check('username', 'Username is Required').not().isEmpty(),
//   check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
// ],

 async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }



    try {
      let user = await User.findOne({ email: req.body.email })

      if(user) {
        res.status(400).json({ errors: [ { msg: 'User already exists'}] });
      }

      user = new User ({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(req.body.password, salt);

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

 module.exports = router;


// const router = require("express").Router();
// const User = require('../../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
