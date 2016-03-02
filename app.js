"use strict";

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib')
  , redis = require('redis')
  , favicon = require('serve-favicon')
  , morgan = require('morgan')
//  , bodyParser = require('body-parser')
//  , methodOverride = require('method-override")

if (process.env.REDISTOGO_URL) {
  var url = require('url'),
      redisUrl = url.parse(process.env.REDISTOGO_URL),
      redisAuth = redisUrl.auth.split(':'),
      redisClient = redis.createClient(redisUrl.port, redisUrl.hostname);

  redisClient.auth(redisAuth[1],function(){
//    redisClient.select(redisAuth[0]);
  });
} else {
  var redisClient = redis.createClient();
}

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.methodOverride());
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
//  app.use(express.errorHandler());
}

//Include the routes
require('./routes/index')(app);

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = server;