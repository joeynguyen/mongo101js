var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if (err) throw err;

    var query = {'name': 'comments'};
    // since findAndModify only performs an action on ONE document, sort allows you
    // to add more granular control on the query
    var sort = [];
    var operation = { $inc: {'counter': 1}};
    var options = {'new': true};

    db.collection('counters').findAndModify(query, sort, operation, options, function(err, doc) {
        if (err) throw err;

        if (!doc) {
            console.log('No counter found for comments.');
        } else {
            console.log('Number of comments ' + doc.counter);
        }

        return db.close();
    });

});
