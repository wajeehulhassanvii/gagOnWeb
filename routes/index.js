
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Gag On Web' });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Admin Post Upload' });
};

exports.user_logged_in = function(req, res, err){
	if(!err){
  	res.send("working");
  	}
};