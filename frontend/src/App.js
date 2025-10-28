import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7, MenuBook } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import EditBookModal from './components/EditBookModal';
import DeleteConfirmation from './components/DeleteConfirmation';
import SearchFilter from './components/SearchFilter';
import { bookService } from './services/api';

function App() {
  const [books, setBooks] = useState([]);
  const [statistics, setStatistics] = useState({
    totalBooks: 0,
    outOfStockBooks: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    genre: '',
    author: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const fetchBooks = async (filters = searchFilters) => {
    try {
      setLoading(true);
      const response = await bookService.getAllBooks(filters);
      setBooks(response.data.books);
      setStatistics(response.data.statistics);
    } catch (error) {
      toast.error('Failed to fetch books');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchBooks(searchFilters);
  }, [searchFilters]);

  const handleAddBook = async (bookData) => {
    try {
      await bookService.createBook(bookData);
      toast.success('Book added successfully!');
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add book');
    }
  };

  const handleEditBook = async (id, bookData) => {
    try {
      await bookService.updateBook(id, bookData);
      toast.success('Book updated successfully!');
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update book');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await bookService.deleteBook(id);
      toast.success('Book deleted successfully!');
      setDeletingBook(null);
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    }
  };

  const handleSearchFilter = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <MenuBook sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Book Inventory Management System
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              }
              label=""
            />
            <IconButton
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Books
                  </Typography>
                  <Typography variant="h4">
                    {statistics.totalBooks}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Out of Stock
                  </Typography>
                  <Typography variant="h4" color="error">
                    {statistics.outOfStockBooks}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Value
                  </Typography>
                  <Typography variant="h4" color="primary">
                    ${statistics.totalValue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    In Stock
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {statistics.totalBooks - statistics.outOfStockBooks}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Add Book Form */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Add New Book
                </Typography>
                <AddBookForm onSubmit={handleAddBook} />
              </Paper>
            </Grid>

            {/* Book List */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Book Inventory
                </Typography>
                <SearchFilter
                  onFilter={handleSearchFilter}
                  filters={searchFilters}
                />
                <BookList
                  books={books}
                  loading={loading}
                  onEdit={setEditingBook}
                  onDelete={setDeletingBook}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Edit Book Modal */}
        <EditBookModal
          book={editingBook}
          open={!!editingBook}
          onClose={() => setEditingBook(null)}
          onSubmit={handleEditBook}
        />

        {/* Delete Confirmation */}
        <DeleteConfirmation
          book={deletingBook}
          open={!!deletingBook}
          onClose={() => setDeletingBook(null)}
          onConfirm={handleDeleteBook}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;