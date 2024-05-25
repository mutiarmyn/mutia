const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/melonRipeness';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect;

    const db = client.db();
    const melonCollection = db.collection('melons');

    // Insert a document
    const cantaloupe = { name: 'Cantaloupe', ripeness: 'unripe' };
    const result = await melonCollection.insertOne(cantaloupe);
    console.log('Inserted document with ID:', result.insertedId);

    // Find a document
    const query = { name: 'Cantaloupe' };
    const melon = await melonCollection.findOne(query);
    console.log('Found document:', melon);

    // Update a document
    const updateQuery = { name: 'Cantaloupe' };
    const update = { $set: { ripeness: 'ripe' } };
    const updatedMelon = await melonCollection.findOneAndUpdate(updateQuery, update, { returnOriginal: false });
    console.log('Updated document:', updatedMelon.value);

    // Delete a document
    const deleteResult = await melonCollection.deleteOne(query);
    console.log('Deleted document with ID:', deleteResult.deletedCount);
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
