import db from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid } from '@mui/material';
import DirectoryCard from "./DirectoryCard";
import { makeStyles } from '@material-ui/core/styles';
import './directory.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15vh',
    fontFamily: 'Nunito',
    background: '#fafafa',
    color: '#dc7027'
  }, 
  body: {
    background: '#fafafa',
    justifyContent: 'center'
  },
  emphasisText: {
    color: '#f4d8ae',
  }
}));

function Directory() {
    const classes = useStyles();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState(["", ""]);
    var roleTitle;
    const collectionName = "directory";
    const array = [];
    const directoryRef = collection(db, collectionName);
    const q = query(directoryRef, where("role", "in", role));
    var display = false;

    const safeAsyncFunction = async () => {
        try {
          const allDocs = await getDocs(q)
          setData(allDocs);
          setIsLoading(false);
        } catch (err) {
          console.log("async-error", err);
        }
      };

      useEffect( () => {
          console.log("load")
          setIsLoading(true);
          safeAsyncFunction();
      }, [role])

      useEffect( () => {
        scroll();
        console.log("scroll")
      }, [array])

      if(!isLoading) {
        data.forEach((doc) => {
          array.push(doc.data());
        })
    }

    function roleToStudent() {
      setRole(["student", "Student"]);
    }

    function roleToTeacher() {
      setRole(["teacher", "Teacher"]);
    }

    const scroll = () => {
      const section = document.querySelector( '#profiles' );
      section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
    };

    if (array.length > 0) {
      display = true;
      if(array[0].role === "student" || array[0].role === "Student") {
        roleTitle = "Student";
      }
      else{
        roleTitle = "Teacher";
      }
    }
    else{
      display = false;
    }

    return (
      <div className={classes.body}>
        <div className={classes.root}>
          <h1>Thomas Jefferson Elementary School <span className={classes.emphasisText}>Directory</span></h1>
        </div>
        <ButtonGroup variant="text" aria-label="text button group" className='directoryButton'>
          <Button onClick={roleToStudent} > View All Students </Button>
          <Button onClick={roleToTeacher} > View All Teachers </Button>
        </ButtonGroup>
        
        {display && <div className={classes.body}>
          <h2 onLoad={scroll}>{roleTitle}s</h2>
        </div>}
        <div id="profiles">
          <Grid container spacing={0.5}>
          {array.map( (name) => (
              <Grid item xl={2} lg={3} key={name.first + name.last}>
                    <DirectoryCard first={name.first} last={name.last} src={name.profile} role={roleTitle}/>
              </Grid>
              ))}
          </Grid>
        </div>
      </div>
    );
}

export default Directory;