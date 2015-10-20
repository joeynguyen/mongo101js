var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    MongoServer = require('mongodb').Server,
    PORT = 8080;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router);
app.use(errorHandler);

var mongoclient = new MongoClient(new MongoServer('localhost', 27017, {'native_parser': true}));
var db = mongoclient.db('course');

app.get('/', function(req,res) {
    res.render('fruitPicker', {'fruits' : [ 'apples', 'oranges', 'bananas', 'peaches'] });
});
app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite === 'undefined') {
        next(Error('Please choose a fruit!'));
    } else {
        res.send('Your favorite fruit is ' + favorite);
    }
});
app.get('/mongo', function(req,res) {
    db.collection('hello_mongo_express').findOne({}, function(err, doc) {
        res.render('hello', doc);
    });
});
app.get('/:name', function(req, res, next) {
    var name = req.params.name;
    var getvar1 = req.query.getvar1;
    var getvar2 = req.query.getvar2;
    res.render('hello', {name: name, getvar1: getvar1, getvar2: getvar2});
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

// Handler for internal errors
function errorHandler(err, req, res, next) {
    console.log(err.message);
    console.log(err.stack);
    res.status(500);
    res.render('error_template', {error: err});
}
