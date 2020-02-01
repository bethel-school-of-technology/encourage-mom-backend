var express = require('express');
var router = express.Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//This Error thrown in Terminal so updated below: express-validator: requires to express-validator/check are deprecated.You should just use require("express-validator") instead.
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator');
const User = require('../../models/User')

/* GET users listing. */
// router.get('/',  function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',  async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

// get all users
router.get("/", auth, async (req, res) => {
  const users = await User.find().sort("username");
  res.send(users);
});

// router.get('/me', auth, async (req, res) => {
//     const user = await User.findById(req.user.id).select('-password');
//     res.send(user);
//     console.log(user)
// });

router.post('/signup', 

 async (req, res) => {
    const errors = validationResult(req.body)
    if(!errors.isEmpty()) {
      console.log("test");
      return res.json({ errors: errors.array() });
    }
  //   if (req.user.isAdmin === true){
  //     return res.status(200).send("Welcome, Admin")
  //   } else {
  //      return res.status(404).send("Access Denied")
  // }

  try {
      console.log(req.body);
      // req.body.password = bcrypt.hashSync(req.body.password, 10);



      let user = await User.findOne({ email: req.body.email })
  
      // console.log(user);

      if(user) {
        res.status(400).json({ errors: [ { msg: 'User already exists'}] });
      }

      const salt = await bcrypt.genSalt(10);

      password = await bcrypt.hash(req.body.password, salt);
      console.log(password)

      user = new User ({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
          password: password,
          isAdmin: req.body.isAdmin
      });

      await user.save();
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
        {expiresIn: 360000},
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
)
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    
})



 module.exports = router;