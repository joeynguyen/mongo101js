var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if (err) throw err;

    var query = { 'grade': {$gt: 80, $lt: 95 } };
    var projection = {'student': 1, 'grade': 1, '_id': 0};

    db.collection('grades').find(query, projection).toArray(function(err, docs) {
        if (err) throw err;

        docs.forEach(function(doc) {
            console.dir(doc);
        });

        db.close();
    });
});
