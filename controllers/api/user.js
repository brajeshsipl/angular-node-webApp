var path = require('path');
var User        = require('../../models/user');
var jwt = require('jsonwebtoken');
var app = require('../../app');

module.exports = {
	welcome : function (req, res ,next){  
		   res.json({success: true, msg: 'Welcome to API Home page.'});
	},
	registeruser : function (req, res ,next){ 
	
		if (!req.body.firstname || !req.body.lastname ||!req.body.email ||!req.body.password) {
			res.json({success: false, message: 'Please enter all required fields.'});
		} else {
		  
			var newUser = new User({
				email: req.body.email,
			});
			User.find({email:newUser.email}, function(errr, userrecord) {
			if(errr) { console.log(errr) }
			  if(userrecord.length > 0){
				  res.json({success: false, message: 'Email id already exists.'});
			  }
			  else{
					var newUserData = new User({
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						email: 	req.body.email,
						user_type: 0,
						is_active: false,
						password: req.body.password
					});
					// save the user
					newUserData.save(function(err) {
					if (err) {
						return res.json({success: false, message: 'Email-id already exists.'});
					}
					res.json({success: true, message: 'Successfully Registered.'});
					}); 
			 }
			});
		}	
	},
	userlogin : function(req, res ,next){
		if (!req.body.email ||!req.body.password) {
			res.json({success: false, msg: 'Please enter all required fields.'});
		} else {
				  // find the user
					  User.findOne({
						email: req.body.email
					  }, function(err, user) {

						if (err) throw err;

						if (!user) {
						  res.json({ success: false, message: 'Authentication failed. User not found.' });
						} else if (user) {
							// check if password matches
						  user.comparePassword(req.body.password, function (err, isMatch) {
							if (isMatch && !err) {
								// create a token
								var token = jwt.sign(user, req.app.get('superSecret'), {
								expiresIn : 60*60*24 // expires in 24 hours
								});

								// return the information including token as JSON
								res.json({
								success: true,
								message: 'You are successfully logged in!',
								token: token,
								data : user
								});
							} else {
								res.json({success: false, message: 'Authentication failed. Wrong password.'});
							}
						  });
						}

					  });	
		}
	},
	userslist :function(req, res ,next ){
	  User.find({}, function(err, users) {
		res.json(users);
	  });
	}

};

