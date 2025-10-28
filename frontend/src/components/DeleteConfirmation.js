import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Delete, Cancel, Warning } from '@mui/icons-material';

const DeleteConfirmation = ({ book, open, onClose, onConfirm }) => {
  if (!book) return null;

  const handleConfirm = () => {
    onConfirm(book._id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
        <Warning sx={{ mr: 1 }} />
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Are you sure you want to delete this book? This action cannot be undone.
        </DialogContentText>
        
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: 'grey.50', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Typography variant="h6" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            by {book.author}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={book.genre} size="small" variant="outlined" />
            <Chip 
              label={`$${book.price?.toFixed(2)}`} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={`Stock: ${book.stock}`} 
              size="small" 
              color={book.stock === 0 ? 'error' : 'success'}
              variant="outlined" 
            />
            {book.publishedYear && (
              <Chip 
                label={book.publishedYear} 
                size="small" 
                variant="outlined" 
              />
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          startIcon={<Cancel />}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm}
          color="error"
          variant="contained"
          startIcon={<Delete />}
        >
          Delete Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;