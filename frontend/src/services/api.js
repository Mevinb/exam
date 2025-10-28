import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  // Get all books with optional filters
  getAllBooks: (params = {}) => api.get('/books', { params }),
  
  // Get a single book by ID
  getBookById: (id) => api.get(`/books/${id}`),
  
  // Create a new book
  createBook: (bookData) => api.post('/books', bookData),
  
  // Update a book
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  
  // Delete a book
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export default api;