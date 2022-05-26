import { getDocs, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase"
import { where, collection, deleteDoc } from "firebase/firestore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CardContent } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { Card } from "@mui/material";

const Roster = (props) =>{
    const [roster, updateRoster] = useState([]);
    const [average, updateAverage] = useState(0);
    const [hasDeleted, updateHasDeleted] = useState(false)

    const fetchRoster = () =>{
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('studentteacher', '==', props.teachername));
        getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((entry)=>{
                updateRoster((roster)=>[...roster, entry.data()]);
                console.log(entry.data());
            })
        })
    }

    const calculateAverage = () =>{
        let val = 0;
        let numElements = 0;
        roster.forEach((entry)=>{
            val += parseFloat(entry.grade);
            numElements++;
        })
        val = val/numElements;
        updateAverage(val);
    }

    const deleteStudent = (name, teacher, grade) =>{
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('studentname', '==', name));
        getDocs(q)
        .then((querySnapshot) => {
            deleteDoc(querySnapshot.docs[0].ref)
        })
        .then(updateHasDeleted(!hasDeleted))
    }


    useEffect(()=>{
        calculateAverage();
    }, [roster])

    useEffect(()=>{
        fetchRoster();
        calculateAverage();
    }, [])
    
    return(<>
        <div className="table-container">
        <div  style={{display: 'inline-block', margin:'auto'}}>
        <Card style={{maxWidth: 300}}><CardContent>
            <h4>Average Grade</h4>
            <h3>{average}</h3>
            </CardContent></Card>
            <Button variant="contained" style={{marginTop:"5px"}}><Link to="./addstudent" style={{color:'white'}}>Add Student</Link></Button>
        </div>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="roster">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Grade (%)</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {roster && roster.slice(0, roster.length/2).map((entry)=>{
                        return(
                            <>
                            {entry.studentname ?
                            <TableRow
                            key={entry.studentname}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" align="center">
                            {entry.studentname}
                            </TableCell>
                            <TableCell align="center">
                            {entry.grade}
                            </TableCell>
                            <TableCell><Button variant="contained">
                                <Link to={"../student/"+entry.studentteacher+"/"+entry.studentname+"/"+entry.grade} style={{color:'white'}}>
                                Change Grade
                                </Link>
                            </Button></TableCell>
                            <TableCell><Button variant="contained" color="error" onClick={()=>deleteStudent(entry.studentname, entry.studentteacher, entry.grade)}>
                                Delete
                            </Button></TableCell>
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

export default Roster