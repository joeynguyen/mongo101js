var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if (err) throw err;

    var docs = [
                {'student': 'Steve', 'age': 7},
                {'student': 'Susie', 'age': 9}
                ];

    db.collection('students').insert(docs, function(err, inserted) {
        if (err) {
            console.log(err.message);
            return db.close();
        }

        console.dir('Successfully inserted: ' + JSON.stringify(inserted));

        return db.close();
    });

});
