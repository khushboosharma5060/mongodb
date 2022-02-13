var { MongoClient } = require('mongodb');
var url = "mongodb://localhost:27017";

let dbo;
MongoClient.connect(url, function (err, db) {
  if (err) {
    throw err;
  }
  console.log("Database connected!");
  dbo = db.db("mydatabase");
});


const express = require('express');
const Api = express();
Api.use(express.json());
const uuid = require('uuid');


Api.post('/', (req, res) => {
  req.body.id = new Date().valueOf();
  dbo.collection("mycollection").insertOne(req.body, function (err, result) {
    if (err) {
      return res.send('error h');
    }
    res.send('added');
  });
});



Api.get('/', (req, res) => {
  dbo.collection("mycollection").find({}).toArray(function (err, result) {
    if (err) {
      return res.send('error h');
    }
    res.send(result);
  });
});


Api.get('/:id', (req, res) => {
  const id = +req.params.id;
  dbo.collection("mycollection").findOne({ id }, function (err, result) {
    if (err) {
      return res.send('error h');
    }
    res.send(result);
  });
});


Api.delete('/:id', (req, res) => {
  const id = +req.params.id;
  dbo.collection("mycollection").deleteOne({ id }, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.send('deleted')
  });
});


Api.put('/:id', (req, res) => {
  const id = +req.params.id;
  dbo.collection("mycollection").updateOne({id}, {$set: req.body}, function (err, result) {
    if (err) throw err;
    res.send('updated')
  });
});



Api.listen(3000, () => console.log('server is going on'));

