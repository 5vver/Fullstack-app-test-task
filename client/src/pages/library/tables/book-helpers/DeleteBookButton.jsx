import React from 'react';
import {Button} from "@mui/material";
import {deleteBook} from "../utils/deleteBook.jsx";

const DeleteBookButton = ({selectedRow, setSelectedRow, gridApi}) => {

  const handleDelete = () => {
    if (!selectedRow)
      return
    const response = deleteBook(selectedRow.data.book_id)
    setSelectedRow('')
    if (gridApi) {
      gridApi.refreshInfiniteCache();
    }
  }

  return (
    <div>
      <Button disabled={!selectedRow} variant="outlined" color="primary" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteBookButton;