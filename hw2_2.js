var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if (err) throw err;

    // var query = {};
    // since findAndModify only performs an action on ONE document, sort allows you
    // to add more granular control on the query
    // var sort = [['State',1],['Temperature',-1]];
    // var operation = { $set: {'month_high': true}};
    // var options = {'new': true};
    //
    // db.collection('data').findAndModify(query, sort, operation, options, function(err, doc) {
    //
    // });
    var cursor = db.collection('data').find({});
    cursor.sort([['State',1],['Temperature',-1]]);

    var previousState = '';
    cursor.each(function(err, doc) {
        if (err) throw err;

        if(doc === null) {
            return db.close();
        }
        if (doc.State !== previousState) {
            doc.month_high = true;
            previousState = doc.State;
            console.dir(previousState);
            db.collection('data').save(doc, function(err, saved) {
                if (err) {
                    console.log(err.message);
                    return db.close();
                }

                console.dir('Successfully saved: ' + saved + " document!");

                console.dir(doc);

            });
        }
    });
    return db.close();
});

