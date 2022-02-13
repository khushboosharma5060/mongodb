const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

let collection;

async function connect() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db('mydatabase');
  collection = db.collection('mycollection');
}

connect();


const express = require('express');
const Api = express();
Api.use(express.json());


Api.post('/', async (req, res) => {
  req.body.id = new Date().valueOf();
  await collection.insertOne(req.body);
  res.send('added');
});



Api.get('/', async(req, res) => {
  const result = await collection.find({}).toArray();
  res.send(result);
});


Api.get('/:id', async(req, res) => {
  const id = req.params.id;
  const result = await collection.find({id}).toArray();
  res.send(result)
});


Api.delete('/:id', (req, res) => {
  const id = +req.params.id;
  dbo.collection("mycollection").deleteOne({ id }, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.send('deleted')
  });
});


Api.put('/:id', async(req, res) => {
  const id = +req.params.id;
  await collection.updateOne({id}, {$set: req.body});
  res.send('hamne kr diya apdate')
});

Api.listen(3000, () => console.log('server is going on'));
