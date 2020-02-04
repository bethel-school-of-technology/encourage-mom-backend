<<<<<<< HEAD
var express = require('express');
=======
var express = require('express-validator');
>>>>>>> f3b9c4e678e11548bf320a747f8c59a291f0e587
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;