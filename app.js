
"use strict";

var options = require('./settings.js');

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib')
  , redis = require("redis");

if (process.env.REDISTOGO_URL) {
  var url = require('url'),
      redisUrl = url.parse(process.env.REDISTOGO_URL),
      redisAuth = redisUrl.auth.split(':'),
      redisClient = redis.createClient(redisUrl.port, redisUrl.hostname);

  redisClient.auth(redisAuth[1],function(){
#    redisClient.select(redisAuth[0]);
  });
} else {
  var redisClient = redis.createClient();
}

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware(
  { "src" : __dirname + '/public'
  , "compile" : function(str, path) {
      return stylus(str)
        .set('filename', path)
//       .set('compress', true)
        .use(nib());
    }
  }
));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Include the routes
require('./routes/index')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
