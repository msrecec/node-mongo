const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log('Connected correctly to server');

  const db = client.db(dbName);
  const collection = db.collection('dishes');

  collection.insertOne({ "name": "Uthappizza", "description": "test"}, (err, result) => {
    assert.equal(err, null);

    console.log('After Insert:\n');
    console.log(result.ops);

    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);

      console.log('Found:\n');
      console.log(docs);

      db.dropCollection('dishes', (err, result) => {
        assert.equal(err, null);
        
        client.close();
      });
    });
  });
});