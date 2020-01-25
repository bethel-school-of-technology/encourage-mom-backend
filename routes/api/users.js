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

 async (req, res) => {
    const errors = validationResult(req.body)
    if(!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);

      let user = await User.findOne({ email: req.body.email })
      console.log(user);

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

      console.log(user);
      var result = await user.save();
      console.log("test_2")
;
      console.log("test2");
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
    }
})

 module.exports = router;