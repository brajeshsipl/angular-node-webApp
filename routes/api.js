
var express = require('express');
var router = express.Router();

var path = require('path'),
user = require('../controllers/api/user');
/* GET home page. */
router.get('/welcome',user.welcome);
router.post('/registeruser',user.registeruser);
router.post('/userlogin',user.userlogin);
router.get('/users',user.userslist);
  


/*export router allow use to use this route from other folder by module.exports */
module.exports = router;

