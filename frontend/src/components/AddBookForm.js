import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { Add, AttachMoney } from '@mui/icons-material';

const AddBookForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
    publishedYear: '',
  });

  const [errors, setErrors] = useState({});

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology',
    'Art',
    'Poetry',
    'Drama',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.stock && formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    if (formData.publishedYear && (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear())) {
      newErrors.publishedYear = 'Invalid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const bookData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: formData.stock ? parseInt(formData.stock) : 0,
      publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
    };

    onSubmit(bookData);

    // Reset form
    setFormData({
      title: '',
      author: '',
      genre: '',
      price: '',
      stock: '',
      publishedYear: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            error={!!errors.author}
            helperText={errors.author}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            error={!!errors.genre}
            helperText={errors.genre}
            required
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            error={!!errors.stock}
            helperText={errors.stock}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Published Year"
            name="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={handleChange}
            error={!!errors.publishedYear}
            helperText={errors.publishedYear}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<Add />}
            sx={{ mt: 1 }}
          >
            Add Book
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddBookForm;