var express = require('express');
var router = express.Router();

var path = require('path'),
index = require('../controllers/index/index');
/* GET home page. */
router.get('/',index.welcome);
router.get('/register',index.register);

/*export router allow use to use this route from other folder by module.exports */
module.exports = router;

