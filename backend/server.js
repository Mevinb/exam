const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-inventory';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  console.log('Database:', mongoose.connection.name);
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  process.exit(1);
});

// Routes
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Book Inventory API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});