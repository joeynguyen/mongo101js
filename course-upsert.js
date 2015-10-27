var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if (err) throw err;

    var query = {'student':'Frank', 'assignment':'hw1'};
    // var query = {'student':'Steve', 'age':4};
    // var operation = {'student':'Frank', 'assignment':'hw1', 'grade': 100};
    var operation = { $set: {'date_returned': new Date(), 'grade': 100} };
    var options = {'upsert': true};

    db.collection('grades').update(query, operation, options, function(err, upserted) {
        if (err) {
            console.log(err.message);
            return db.close();
        }

        console.dir('Successfully upserted: ' + upserted + " document!");

        return db.close();
    });

});
