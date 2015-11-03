var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if (err) throw err;

    var cursor = db.collection('students').find({}, {"scores": 1});
    // cursor.sort(grade:1);
    // cursor.limit(4);
    // cursor.skip(1);
    // cursor.sort([['scores.type',1],['scores.score',-1]]);

    // var options = { 'skip': 1,
    //                 'limit': 4,
    //                 'sort': [['grade',1], ['student',-1]]
    //                 };
    // var cursor = db.collection('students').find({}, {}, options);


    cursor.each(function(err, doc) {
        if (err) throw err;

        if(doc === null) {
            return db.close();
        }
        var score;
        var operator;
        var scoresArr = [];

        for (var i=0; i < doc.scores.length; i++) {
            if (doc.scores[i].type === 'homework' && score === undefined) {
                score = doc.scores[i].score;
            } else if (doc.scores[i].type === 'homework' && score < doc.scores[i].score) {
                score = doc.scores[i].score;
            }
            scoresArr.push({"type": doc.scores[i].type, "score": score || doc.scores[i].score});
        }

        operator = {'name': doc.name, 'scores': scoresArr};
        db.collection('students').update({'_id': doc._id}, operator, function(err, updated) {
            if (err) throw err;
        });

        // console.dir("id: " + doc._id + " scoresArr: " + JSON.stringify(scoresArr));
        console.dir(doc);
    });
});

