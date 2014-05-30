
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Gag On Web' });
};

exports.log_out = function(req, res){
  res.render('index', { title: 'Gag On Web' });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Admin Post Upload' });
};


exports.user_logged_in = function(req, res){
	
res.send("<br><br><br><div id='uploadForm'><form method='post' enctype='multipart/form-data' name='postUpload' action='/post_upload' ><br><br><input type='text' id='post_title' name='post_title' placeholder='Post Title'><br><br><input type='text' id='post_description' name='post_description' placeholder='Post Description'><br><br><input type='file' id='thumbnail' name='thumbnail' placeholder='Browse Image'><br><br><button>Post Image</button></form></div>");
  	// onSubmit='return formUpload()'
};