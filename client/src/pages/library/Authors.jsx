import React from 'react';
import {Grid, Typography} from "@mui/material";
import MainCard from "@components/MainCard.jsx";
import AuthorsTable from "./tables/AuthorsTable.jsx";



const Authors = () => {

  return (
    <MainCard title="List of Authors">
      <Grid container direction={'column'} spacing={2} justifyContent={'center'} alignItems="center">
        <Grid item >
          <Typography variant="h4" mb={2}>Authors</Typography>
          <AuthorsTable />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Authors;