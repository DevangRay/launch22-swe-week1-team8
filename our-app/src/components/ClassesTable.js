import db from "../firebase"
import {collection, getDocs} from "firebase/firestore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const ClassesTable = (props) =>{
    const exampleData = [{teacher: "Smith", numStudents: 21}, {teacher: "Jones", numStudents: 32}, {teacher: "Spjziak", numStudents: 19},]
    const [classesData, updateClassesData] = useState([]);

    const fetchClassesData = () =>{
        let classesArray = [];
        getDocs(collection(db, "classes"))
        .then((allDocs) => {allDocs.forEach((doc) => 
        classesArray.push({teacher : doc.data().teacher, "numStudents": doc.data()["numberstudents"]})
        )})
        .then(()=>updateClassesData([...classesArray]));
    }

    useEffect(()=>{
        fetchClassesData();
    }, [])

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
                        <TableRow
                        key={entry.teacher}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" align="center">
                        {entry.teacher}
                        </TableCell>
                        <TableCell align="center">
                        {entry.numStudents}
                        </TableCell>
                        <TableCell><Button variant="contained">View</Button></TableCell>
                        </TableRow>
                        </>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>
    </div>
    </>)
}

export default ClassesTable;