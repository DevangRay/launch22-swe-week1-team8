import db from "../firebase"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

const ClassesTable = (props) =>{
    const exampleData = [{teacher: "Smith", numStudents: 21}, {teacher: "Jones", numStudents: 32}, {teacher: "Spjziak", numStudents: 19},]
    return(<>
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
                {exampleData.map((entry)=>{
                    return(
                        <>
                        <TableRow
                        key={entry.teacher}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        ></TableRow>
                        <TableCell component="th" scope="row" align="center">
                        {entry.teacher}
                        </TableCell>
                        <TableCell align="center">
                        {entry.numStudents}
                        </TableCell>
                        <TableCell><Button variant="contained">View</Button></TableCell>
                        </>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>
    </>)
}

export default ClassesTable;