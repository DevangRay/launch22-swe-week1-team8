import { getDocs, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase"
import { where, collection } from "firebase/firestore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

const Roster = (props) =>{
    const [roster, updateRoster] = useState([]);

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

    useEffect(()=>{
        fetchRoster();
    }, [])
    
    return(<>
        <div className="table-container">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="roster">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Grade (%)</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {roster && roster.slice(0, Math.floor(roster.length/2)).map((entry)=>{
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
                                Change Grade
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