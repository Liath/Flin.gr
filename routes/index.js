//Routes
'use strict';

module.exports = function(app){
    //Site index
    app.get('/', function(req, res){
      res.render('index', { title: 'Express' });
    });
    app.get('/send/:id', function(req, res){
      var id = req.params.id.replace(/\W/g,'');
      res.render('channel', {
        id : id
      });
    });
    app.get(/\/(send|send\/)/, function(req, res){
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
      res.redirect('/send/'+s4() + s4());
    });
    //Post routes
    //require('./post')(app);
};