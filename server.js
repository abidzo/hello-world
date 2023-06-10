const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'sports';
const collectionName = 'players';

// MongoDB Connection
let db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');
  db = client.db(dbName);
});

// Add a player
app.post('/players', (req, res) => {
  const player = req.body;
  db.collection(collectionName).insertOne(player, (err, result) => {
    if (err) {
      console.error('Error adding player:', err);
      return res.status(500).json({ error: 'Failed to add player' });
    }
    res.status(201).json(result.ops[0]);
  });
});

// Update a player
app.put('/players/:id', (req, res) => {
  const playerId = req.params.id;
  const updates = req.body;
  db.collection(collectionName).updateOne({ _id: ObjectId(playerId) }, { $set: updates }, (err, result) => {
    if (err) {
      console.error('Error updating player:', err);
      return res.status(500).json({ error: 'Failed to update player' });
    }
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.sendStatus(200);
  });
});

// Delete a player
app.delete('/players/:id', (req, res) => {
  const playerId = req.params.id;
  db.collection(collectionName).deleteOne({ _id: ObjectId(playerId) }, (err, result) => {
    if (err) {
      console.error('Error deleting player:', err);
      return res.status(500).json({ error: 'Failed to delete player' });
    }
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.sendStatus(204);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
