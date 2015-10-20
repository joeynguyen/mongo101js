var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    MongoServer = require('mongodb').Server,
    PORT = 8080;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new MongoServer('localhost', 27017, {'native_parser': true}));
var db = mongoclient.db('course');

app.get('/', function(req,res) {
    db.collection('hello_mongo_express').findOne({}, function(err, doc) {
        res.render('hello', doc);
    });
});

// Handle all routes not handled previously ^^
app.get('*', function(req,res) {
    res.send("Result not found", 404);
});
mongoclient.open(function(err, mongoclient) {
    if (err) throw err;

    app.listen(PORT);
    console.log('Server listening at http://localhost:' + PORT);
});
