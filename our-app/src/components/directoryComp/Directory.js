import db from "../../firebase";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid } from '@mui/material';
import DirectoryCard from "./DirectoryCard";
import { makeStyles } from '@material-ui/core/styles';
import './directory.css';
import {Link } from "react-router-dom";

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
    const [goDelete, setGoDelete] = useState(null);
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
      }, [role, goDelete])

      useEffect( () => {
        scroll();
        console.log("scroll")
      }, [array])

      useEffect( () => {
        if (goDelete !== null){
            deleteClass();
        }
    }, [goDelete])

      if(!isLoading) {
        data.forEach((doc) => {
          array.push({data: doc.data(), id: doc._key.path.segments[6]});
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
      if(array[0].data.role === "student" || array[0].data.role === "Student") {
        roleTitle = "Student";
      }
      else{
        roleTitle = "Teacher";
      }
    }
    else{
      display = false;
    }

    const deleteClass = async () => {
      try {
        await deleteDoc(doc(db, collectionName, goDelete));
        console.log("deleted");
        setGoDelete(null);
      } catch (err) {
        console.log("async-error", err);
      }
    };

    function setDelete(id) {
      array.forEach( (name) => {
        if (name.id === id) {
            console.log(name.data.first);
            setGoDelete(id);
        }
    })
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
          {roleTitle==="Student"?<Button variant="outlined"> <Link to="/add-student">Add {roleTitle}</Link></Button>:<Button variant="outlined"> <Link to="/add-teacher">Add {roleTitle}</Link></Button>}
          
        </div>}
        <div id="profiles">
          <Grid container spacing={0.5}>
          {array.map( (name) => (
              <Grid item xl={2} lg={3} key={name.id}>
                    <DirectoryCard first={name.data.first} last={name.data.last} src={name.data.profile} role={roleTitle}/>
                    <Button onClick={() => setDelete(name.id)}>Remove</Button>
              </Grid>
              ))}
          </Grid>
        </div>
      </div>
    );
}

export default Directory;