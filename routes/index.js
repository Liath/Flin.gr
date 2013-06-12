//Routes
'use strict';

module.exports = function(app){
    //Site index
    app.get('/', function(req, res){
      res.render('index', { title: 'Express' });
    });

    //Post routes
    //require('./post')(app);
};