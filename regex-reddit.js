var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if (err) throw err;

    var query = { title: {$regex: 'NSA'} };
    var projection = {title: 1, '_id': 0};

    db.collection('reddit').find(query, projection).each(function(err, doc) {
        if (err) throw err;

        if (doc !== null) {
            console.dir(doc);
        }

        return db.close();
    });
});
