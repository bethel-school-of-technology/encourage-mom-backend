var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup')
})

router.post('/signup', function(req, res, next) {

})

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.post('/login', function(req, res, next) {

})

module.exports = router;
