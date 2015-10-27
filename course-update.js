var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if (err) throw err;

    var query = {'age':5};
    var operation = {$set: {'date_returned': new Date()}};
    var options = {'multi': true};

    db.collection('students').update(query, operation, options, function(err, updated) {
        if (err) {
            console.log(err.message);
            return db.close();
        }

        console.dir('Successfully updated: ' + updated + " document!");

        return db.close();
    });

});
