const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// GET all books
app.get('/books', (req, res) => {
  // Retrieve all books from the MongoDB collection
  db.books.find().toArray((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(result);
    }
  });
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;

  // Retrieve the book with the given ID from the MongoDB collection
  db.books.findOne({ _id: ObjectId(bookId) }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;

  // Insert the new book into the MongoDB collection
  db.books.insertOne(newBook, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json(result.ops[0]);
    }
  });
});

// PUT (update) an existing book
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  // Update the book with the given ID in the MongoDB collection
  db.books.updateOne({ _id: ObjectId(bookId) }, { $set: updatedBook }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (result.modifiedCount > 0) {
      res.json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;

  // Delete the book with the given ID from the MongoDB collection
  db.books.deleteOne({ _id: ObjectId(bookId) }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (result.deletedCount > 0) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
