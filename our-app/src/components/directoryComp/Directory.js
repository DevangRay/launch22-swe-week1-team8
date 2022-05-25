import db from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DirectoryCard from "./DirectoryCard";
import Grid from '@mui/material/Grid';
import './directory.css';

function Directory() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState("");
    const collectionName = "directory";
    const array = [];
    const directoryRef = collection(db, collectionName);
    const q = query(directoryRef, where("role", "==", role));
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

      if(!isLoading) {
        data.forEach((doc) => {
          array.push(doc.data());
        })
    }

    function roleToStudent() {
      setRole("Student");
    }

    function roleToTeacher() {
      setRole("Teacher");
    }

    if (array.length > 0) {
      display = true;
    }
    else{
      display = false;
    }

    return (
      <div>
        <h1>Thomas Jefferson Elementary School Directory</h1>
        <br></br>
        <Button onClick={roleToStudent}> Click here for Student </Button>
        <Button onClick={roleToTeacher}> Click here for Teacher </Button>
        {display && <div>
          <h2>{role}s</h2>
        </div>}
        <Grid container spacing={0.5}>
        {array.map( (name) => (
            <Grid item xs={4}>
                {/* <div key = {name.first}> */}
                    <DirectoryCard first={name.first} last={name.last} src={name.profile} role={name.role}/>
                {/* </div> */}
            </Grid>
            ))}
        </Grid>
      </div>
    );
}

export default Directory;