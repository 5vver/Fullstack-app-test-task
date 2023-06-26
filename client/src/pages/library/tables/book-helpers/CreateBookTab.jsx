import React, {useState} from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import {createBook} from "../utils/createBook.jsx";
import {checkAuthor} from "../utils/checkAuthor.jsx";

const CreateBookTab = ({gridApi}) => {

  const [bookData, setBookData] = useState({
    title: '',
    publication_date: '',
    pages: '',
    price: '',
    author_id: '',
  });

  const handleInputChange = (event) => {
    setBookData({
      ...bookData,
      [event.target.name]: event.target.value,
    });
  };

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const isEmpty = !Object.values(bookData).every(x => x !== '')
    if (isEmpty) {
      alert('Fill in all rows!')
      return
    }

    checkAuthor(bookData.author_id)
      .then((isValid) => {
        if (!isValid) {
          throw new Error(`Author with provided id - ${bookData.author_id} doesn't exist!`)
        }
      })
      .then(() => {
        const response = createBook(bookData)
        if (gridApi) {
          gridApi.refreshInfiniteCache();
        }
      })
      .catch(error => {
        alert(error.message)
      })
      .finally(() => {
        setBookData({
          title: '',
          publication_date: '',
          pages: '',
          price: '',
          author_id: '',
        })
        setOpen(false)
      })
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Add Book
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Book Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="publication_date"
            label="Publication Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="pages"
            label="Pages"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="author_id"
            label="Author ID"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateBookTab;