import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Create book
// POST: /books
router.post('/', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    }
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Get all books
// GET: /books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Get single book
// GET: /books/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Update book
// PUT: /books/:id
router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).json({message: 'Book not found'});
    }
    const updatedBook = await Book.findById(book.id);
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Delete book
// DELETE: /books/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({message: 'Book not found'});
    }
    await Book.findByIdAndDelete(book.id);
    return res.status(200).json({message: 'Book deleted'});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
  }
})

export default router;