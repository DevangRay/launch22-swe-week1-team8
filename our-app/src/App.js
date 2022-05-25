import React from 'react';
import Header from './landing_page/landing_page_components/Header';
import Functions from './landing_page/landing_page_components/Functions';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { Routes, Route, Link } from 'react-router-dom';
import Classes from './components/classesComp/Classes';
import Home from './components/Home';
import Error from './components/Error';
import Calendar from './components/calenderComp/Calendar';
import IndividualClass from './components/classesComp/IndividualClass';

//insert home page background here
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + ''})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Functions />
    </div>

    /*
    <div className="App">
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/classes"> Classes </Link>
        <Link to="/calendar"> Calendar </Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/classes" element={<Classes/>} />
        <Route path="/classes/:teacherName" element={<IndividualClass />} />
        <Route path="/calendar" element = {<Calendar/>} />
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </div>
  );
  */
  );
}

export default App;
