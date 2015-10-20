var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    PORT = 8080;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req,res) {
    res.render('hello', {'name': 'Swig'});
});

// Handle all routes not handled previously ^^
app.get('*', function(req,res) {
    res.send("Result not found", 404);
});

app.listen(PORT);
console.log('Server listening at http://localhost:' + PORT);

// Open the connection to the server
/*
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if(err) throw err;

    // Find one document in our collection
    db.collection('coll').findOne({}, function(err, doc) {
        if(err) throw err;

        // Print the result
        console.dir(doc);

        // Close the db
        db.close();
    });

    // Declare success
    console.dir("Called findOne!");
});
*/
