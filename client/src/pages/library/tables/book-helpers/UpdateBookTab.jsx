import React, {useState} from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import {updateBook} from "../utils/updateBook.jsx";
import {checkAuthor} from "../utils/checkAuthor.jsx";

const UpdateBookTab = ({selectedRow, setSelectedRow, gridApi}) => {

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
    if (!selectedRow)
      return

    checkAuthor(bookData.author_id)
    .then((isValid) => {
      if (!isValid) {
        throw new Error(`Author with provided id - ${bookData.author_id} doesn't exist!`)
      }
    })
    .then(() => {
      const response = updateBook(selectedRow.data.book_id, bookData)
      if (gridApi) {
        gridApi.refreshInfiniteCache();
      }
    })
    .catch(error => {
      alert(error.message)
    })
    .finally(() => {
      setSelectedRow('')
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
      <Button disabled={!selectedRow} variant="outlined" color="primary" onClick={handleToggle}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update book info</DialogTitle>
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
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateBookTab;