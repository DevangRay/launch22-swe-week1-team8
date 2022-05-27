import React from 'react';
import Header from './landing_page_components/Header';
import Functions from './landing_page_components/Functions';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ButtonGroup, Button } from '@mui/material';

//insert home page background here
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + ''})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

function MainPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Functions />
    </div>
  );
}

export default MainPage;
