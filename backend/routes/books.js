const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books - Get all books with optional search and filter
router.get('/', async (req, res) => {
  try {
    const { search, genre, author, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by genre
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    // Filter by author
    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }

    const books = await Book.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 });

    // Calculate statistics
    const totalBooks = books.length;
    const outOfStockBooks = books.filter(book => book.stock === 0).length;
    const totalValue = books.reduce((sum, book) => sum + (book.price * book.stock), 0);

    res.json({
      books,
      statistics: {
        totalBooks,
        outOfStockBooks,
        totalValue: totalValue.toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/books - Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, price, stock, publishedYear } = req.body;

    // Validation
    if (!title || !author || !genre || price === undefined) {
      return res.status(400).json({ 
        message: 'Title, author, genre, and price are required' 
      });
    }

    if (price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    const book = new Book({
      title,
      author,
      genre,
      price,
      stock: stock || 0,
      publishedYear
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// PUT /api/books/:id - Update a book's details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, price, stock, publishedYear } = req.body;

    // Validation
    if (price !== undefined && price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, price, stock, publishedYear },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else if (error.name === 'CastError') {
      res.status(400).json({ message: 'Invalid book ID' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedBook = await Book.findByIdAndDelete(id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ message: 'Invalid book ID' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// GET /api/books/:id - Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ message: 'Invalid book ID' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;