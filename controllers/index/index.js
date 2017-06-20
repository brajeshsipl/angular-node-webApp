var path = require('path');
module.exports = {
	welcome : function (req, res ,next){  
		  res.render('pages/index', { title: 'Express' });
	},
	register : function (req, res ,next){  
		  res.render('pages/register', { title: 'Register' });
	}

};
