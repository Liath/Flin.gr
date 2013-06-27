//Routes
'use strict';

module.exports = function(app){
    function idGen() {
        return (Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1))+(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
    };
    //Site index
    app.get('/', function(req, res){
      res.render('index', { title: 'Express' });
    });
    app.get('/send/:id', function(req, res){
      var id = req.params.id.replace(/\W/g,'');
      res.render('channel', {
        cid : id,
        uid: idGen()
      });
    });
    app.get(/\/(send|send\/)/, function(req, res){
      res.redirect('/send/'+idGen());
    });
    //Post routes
    //require('./post')(app);
};