import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Edit, Delete, Warning } from '@mui/icons-material';

const BookList = ({ books, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (books.length === 0) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6" color="textSecondary">
          No books found
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add some books to get started!
        </Typography>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return { label: 'Out of Stock', color: 'error' };
    } else if (stock <= 5) {
      return { label: 'Low Stock', color: 'warning' };
    } else {
      return { label: 'In Stock', color: 'success' };
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Author</strong></TableCell>
            <TableCell><strong>Genre</strong></TableCell>
            <TableCell align="right"><strong>Price</strong></TableCell>
            <TableCell align="center"><strong>Stock</strong></TableCell>
            <TableCell align="center"><strong>Year</strong></TableCell>
            <TableCell align="center"><strong>Added</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => {
            const stockStatus = getStockStatus(book.stock);
            return (
              <TableRow
                key={book._id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  opacity: book.stock === 0 ? 0.7 : 1
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {book.stock === 0 && (
                      <Tooltip title="Out of stock">
                        <Warning color="error" sx={{ mr: 1, fontSize: 16 }} />
                      </Tooltip>
                    )}
                    <Typography variant="body2" noWrap>
                      {book.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap>
                    {book.author}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={book.genre} 
                    size="small" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    ${book.price.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={book.stock}
                    size="small"
                    color={stockStatus.color}
                    variant={book.stock === 0 ? 'filled' : 'outlined'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {book.publishedYear || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(book.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Tooltip title="Edit book">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(book)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete book">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(book)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookList;