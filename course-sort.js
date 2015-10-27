var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if (err) throw err;

    // var cursor = db.collection('grades').find({});
    // cursor.sort(grade:1);
    // cursor.limit(4);
    // cursor.skip(1);
    // cursor.sort([['grade',1],['student',-1]]);

    var options = { 'skip': 1,
                    'limit': 4,
                    'sort': [['grade',1], ['student',-1]]
                    };
    var cursor = db.collection('grades').find({}, {}, options);


    cursor.each(function(err, doc) {
        if (err) throw err;

        if(doc === null) {
            return db.close();
        }

        console.dir(doc);
    });
});
