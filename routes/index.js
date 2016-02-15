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
    app.get('/channel/:id', function(req, res){
      var id = req.params.id.replace(/\W/g,'');
      res.render('channel', {
        cid : id,
        uid: idGen()
      });
    });
    app.get(/^\/(channel|channel\/)/, function(req, res){
      if (req.param('c') != null) {
        res.redirect('/channel/'+req.param('c'));
      } else {
        res.redirect('/channel/'+idGen());
      }
    });
    //Post routes
    //require('./post')(app);
};