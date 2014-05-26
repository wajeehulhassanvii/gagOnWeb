
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Gag On Web' });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Admin Post Upload' });
};