
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , uploading = require('./routes/upload')
    ,results = require('./routes/getImages')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 10080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    uploadDir: __dirname + '/tmp'
}));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*Router*/
app.get('/', routes.index);
app.get('/upload',  uploading.show);
app.post('/upload',  uploading.uploadFile)

app.get('/getImages',results.getInitialImages);
app.get('/getImages/:tag',results.getInitialImages);
app.get('/getImages/:columns/:times', results.getRestImages);
app.get('/getImages/:columns/:times/:tag', results.getRestImages);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
