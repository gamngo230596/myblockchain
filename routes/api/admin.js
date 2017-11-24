var express = require('express');
var mongodb=require('mongodb');
var ObjectId=mongodb.ObjectId;
var router = express.Router();

/* GET students listing. */
router.get('/', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://NgoGam:gam23051996@ds119548.mlab.com:19548/blockchain';
    MongoClient.connect(url, function (err, db)
    {
        if(err)
        {
            console.log('Unable to connect to server',err);
        }
        else
        {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('wallet');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);

                }
                //Close connection
                db.close();
            });
        }
    });
});

router.post('/', function(req, res,next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://NgoGam:gam23051996@ds119548.mlab.com:19548/blockchain';
    MongoClient.connect(url, function (err, db)
    {
        if(err)
        {
            console.log('Unable to connect to server',err);
        }
        else
        {
            console.log('Connection established to', url);
            var myobj = { "email": req.body.email,"password":req.body.password,"money":1000};
            db.collection("wallet").insertOne(myobj, function(err, result) {
                if (err)
                    res.send(err);
                else
                    res.send("1 documents inserted");
                db.close();
            });

        }
    });
});

router.delete('/:id', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://NgoGam:gam23051996@ds119548.mlab.com:19548/blockchain';
    MongoClient.connect(url, function (err, db)
    {

        if(err)
        {
            console.log('Unable to connect to server',err);
        }
        else
        {
            console.log('Connection established to', url);

            var myobj = { "_id": new ObjectId(""+req.params.id)};
            db.collection("wallet").removeOne(myobj, function(err, result) {
                if (err) res.send(err);
                else
                    res.send("1 document deleted");
                db.close();
            });

        }

    });
});
router.put('/:id', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://NgoGam:gam23051996@ds119548.mlab.com:19548/blockchain';
    MongoClient.connect(url, function (err, db)
    {
        if(err)
        {
            console.log('Unable to connect to server',err);
        }
        else
        {
            console.log('Connection established to', url);

            // Get the documents collection
            var myobj = { "_id": new ObjectId(""+req.params.id)};

            var newobj={"email":req.body.emailedit,"password":req.body.passwordedit};
            db.collection("wallet").updateOne(myobj, newobj, function(err, result) {
                if (err) res.send(err);
                else
                    res.send("1 document updated");
                db.close();
            });

        }
    });
});
module.exports = router;