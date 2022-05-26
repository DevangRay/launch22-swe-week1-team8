import db from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid } from '@mui/material';
import DirectoryCard from "./DirectoryCard";
import './directory.css';

function Directory() {
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
          const allDocs = await getDocs(q)   //collection(db, collectionName)
          setData(allDocs);
          setIsLoading(false);
        } catch (err) {
          console.log("async-error", err);
        }
      };

      useEffect( () => {
          setIsLoading(true);
          safeAsyncFunction();
      }, [role])

      useEffect( () => {
        scroll();
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
      console.log(section);
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
      <div>
        <h1>Thomas Jefferson Elementary School Directory</h1>
        {/* <br></br> */}
        <ButtonGroup variant="text" aria-label="text button group" className="directoryButton">
          <Button onClick={roleToStudent} > View All Students </Button>
          <Button onClick={roleToTeacher} > View All Teachers </Button>
        </ButtonGroup>
        
        {display && <div>
          <h2>{roleTitle}s</h2>
          {/* <Button onClick={getOffset}>Click to get offset of profiles</Button> */}
        </div>}
        <div id="profiles">
          <Grid container spacing={0.5}>
          {array.map( (name) => (
              <Grid item xl={2} lg={3} key={name.first + name.last}>
                  {/* <div key = {name.first}> */}
                      <DirectoryCard first={name.first} last={name.last} src={name.profile} role={roleTitle}/>
                  {/* </div> */}
              </Grid>
              ))}
          </Grid>
        </div>
      </div>
    );
}

export default Directory;