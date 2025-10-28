const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  publishedYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better search performance
bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

module.exports = mongoose.model('Book', bookSchema);