import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import Feature from '../static/Feature';
import useWindowPosition from '../hook/useWindowPosition';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="place-to-visit">
      <ImageCard place={Feature[0]} checked={checked} location={"/classes"}/>
      <ImageCard place={Feature[1]} checked={checked} location={"/calendar"}/>
      <ImageCard place={Feature[2]} checked={checked} location={"/directory"}/>
      <ImageCard place={Feature[3]} checked={checked} location={"/directory"}/>
    </div>
  );
}