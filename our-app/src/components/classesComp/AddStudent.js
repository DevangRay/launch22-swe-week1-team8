import { Button, TextField } from "@mui/material"

const AddStudent = (props) =>{
    return (
        <>
        <h2>Add Student</h2>
        <TextField label="Student Name"></TextField>
        <TextField label="Grade" style={{marginLeft:"5px"}}></TextField>
        <br></br>
        <Button variant="contained" style={{ marginTop:"5px" }}>Submit</Button>
        <br></br>
        <Button variant="outlined" style={{ marginTop:"5px" }}>Back</Button>
        </>
    )
}

export default AddStudent