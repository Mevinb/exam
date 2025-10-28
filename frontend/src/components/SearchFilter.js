import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import { Search, Clear, FilterList } from '@mui/icons-material';

const SearchFilter = ({ onFilter, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

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

  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'price', label: 'Price' },
    { value: 'stock', label: 'Stock' },
    { value: 'createdAt', label: 'Date Added' },
    { value: 'publishedYear', label: 'Published Year' },
  ];

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...localFilters,
      [name]: value
    };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      genre: '',
      author: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    setLocalFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const hasActiveFilters = localFilters.search || localFilters.genre || localFilters.author;

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Search books..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            placeholder="Title, author, or genre"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            size="small"
            select
            label="Genre"
            value={localFilters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Author"
            value={localFilters.author}
            onChange={(e) => handleFilterChange('author', e.target.value)}
            placeholder="Filter by author"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            size="small"
            select
            label="Sort by"
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            size="small"
            select
            label="Order"
            value={localFilters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={1}>
          <Box display="flex" justifyContent="center">
            {hasActiveFilters && (
              <Tooltip title="Clear all filters">
                <IconButton 
                  onClick={handleClearFilters}
                  color="primary"
                  size="small"
                >
                  <Clear />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchFilter;