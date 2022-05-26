import db from "../../firebase"
import {collection, getDocs, doc, deleteDoc} from "firebase/firestore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const RemoveClassTable = (props) =>{
    //const exampleData = [{teacher: "Smith", numStudents: 21}, {teacher: "Jones", numStudents: 32}, {teacher: "Spjziak", numStudents: 19},]
    const [classesData, updateClassesData] = useState([]);
    const [goDelete, setGoDelete] = useState(null);
    const collectionName = "classes";

    const fetchClassesData = () =>{
        let classesArray = [];
        getDocs(collection(db, "classes"))
        .then((allDocs) => {
            console.log("fetching");
            allDocs.forEach((doc) => {
            // console.log("docID:", doc._key.path.segments[6]);
            classesArray.push({teacher : doc.data().teacher, "numStudents": doc.data()["numberstudents"], "id":doc._key.path.segments[6]}) }
        )})
        .then(()=>updateClassesData([...classesArray]));
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

    useEffect(()=>{
        if (goDelete === null) {
            fetchClassesData();
        }
    }, [goDelete])

    useEffect( () => {
        if (goDelete !== null){
            deleteClass();
        }
    }, [goDelete])

    function setDelete(id) {
        classesData.forEach( (name) => {
            if (name.id === id) {
                console.log(name.teacher);
                setGoDelete(id);
            }
        })
    }

    return(<>
    <div className="table-container">
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="classes table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Teacher</TableCell>
                <TableCell align="center">Number of Students</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {classesData !== [] && classesData.map((entry)=>{
                    return(
                        <>
                        {entry.numStudents ?
                        <TableRow
                            key={entry.teacher}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" align="center">
                            {entry.teacher}
                        </TableCell>
                        <TableCell align="center">
                            {entry.numStudents}
                        </TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => {setDelete(entry.id)}}>Delete</Button>
                            </TableCell>
                        </TableRow>
                        : <></>
                        }
                        </>
                        
                        
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>
    </div>
    </>)
}

export default RemoveClassTable;