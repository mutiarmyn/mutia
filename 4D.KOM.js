const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/fruitRipeness';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const db = client.db();
    const fruitCollection = db.collection('fruits');

    // Insert a document
    const apple = { name: 'Apple', ripeness: 'ripe' };
    const result = await fruitCollection.insertOne(apple);
    console.log('Inserted document with ID:', result.insertedId);

    // Find a document
    const query = { name: 'Apple' };
    const fruit = await fruitCollection.findOne(query);
    console.log('Found document:', fruit);

    // Update a document
    const updateQuery = { name: 'Apple' };
    const update = { $set: { ripeness: 'unripe' } };
    const updatedFruit = await fruitCollection.findOneAndUpdate(updateQuery, update, { returnOriginal: false });
    console.log('Updated document:', updatedFruit.value);

    // Delete a document
    const deleteResult = await fruitCollection.deleteOne(query);
    console.log('Deleted document with ID:', deleteResult.deletedCount);
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
