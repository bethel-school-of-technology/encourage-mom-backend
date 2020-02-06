
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth');
// const admin = require('../../middleware/admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');


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

// router.get('/me', auth, async (req, res) => {
//   try {
//       // console.log(req.body);
//       const profile = await User.findOne({user: req.body.id})
//       // populate(
//       //     'user',
//       //     ['username']
//       // );
//       console.log("successsssss!");
//       res.json(user);
//       console.log(user);

//   } catch(err) {
//       console.error(err.mesage);
//       console.log("fail!!!")
//       res.status(500).send('Server Error')
//   }
// })


// @route POST api/auth
// @desc Authenticate user & get token
// @access Public


router.post('/',
   async (req, res) => {
        const errors = validationResult(req.body)
        if(!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }

        try {
          console.log(req.body);
     

        let user = await User.findOne({ username: req.body.username});
          console.log("Test1")

        // let adminUser = await User.findOne({"username": "Admin", "password": "admin"})

        // if (adminUser) {
        //   console.log("ADMIN!!!")
        // }

        if(!user) {
            console.log("Invalid Credentials")
            return res
            .status(400)
            .json({ errors: [ { msg: 'Invalid Credentials'}] 
          });
            
        }

    const isMatch= await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
          alert("'Username or Password is wrong'")
            return res
            .status(400)
            .json({ errors: [ { msg: 'Username or Password is wrong'}] });
          }
      
      if (user.isAdmin === true) {
        console.log("You are an admin!")
        console.log(user.isAdmin);
      } else {
        console.log("You are not an admin")
      }


        const payload = {
          user: {
            id: user.id
          }
        }
        console.log("Test2")

        
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {expiresIn: 360000},
          (err, token) => {
            if(err) throw err;
            res.json({ user, token });
            console.log({token})
      })
      // res.send(user);
      console.log('success!')
      console.log(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
     })

module.exports = router;