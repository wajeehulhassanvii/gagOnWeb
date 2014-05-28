
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var db = require('./model/db');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
/*app.use(express.urlencoded());
app.use(express.methodOverride());*/
app.use(express.bodyParser({uploadDir:'./public/images'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/admin',routes.admin);
app.get('/', routes.index);
app.get('/user_logging_in', routes.user_logged_in);
app.get('/logging_out',routes.log_out);
app.post('/post_upload',db.uploading_post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
