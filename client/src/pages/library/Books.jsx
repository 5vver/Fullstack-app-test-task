import React from 'react';
import {Grid, Typography} from "@mui/material";
import MainCard from "@components/MainCard.jsx";
import BooksTable from "./tables/BooksTable.jsx";

const Books = () => {
  return (
    <MainCard title="Books Management">
      <Grid container direction={'column'}
            spacing={2}
            justifyContent={'center'}
            alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" mb={2}>Books</Typography>
          <BooksTable />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Books;