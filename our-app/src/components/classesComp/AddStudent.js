import { Button, Input } from "@mui/material"
import { useParams, Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore";
import { useRef } from "react";
import db from "../../firebase";

const AddStudent = (props) =>{
    let params = useParams();
    let nameRef = useRef();
    let gradeRef = useRef();

    const sendStudent = () =>{
        addDoc(collection(db, "classes"), 
        {
            "studentteacher" : params.teacherName,
            "grade" : gradeRef.current.value ? gradeRef.current.value : 0,
            "studentname" : nameRef.current.value ? nameRef.current.value : ""
        })
        .then()
    }

    return (
        <>
        <h2>Add Student</h2>
        <Input inputRef={nameRef} defaultValue="Student Name"></Input>
        <Input style={{marginLeft:"5px"}} inputRef={gradeRef} defaultValue="Grade"></Input>
        <br></br>
        <Button variant="contained" style={{ marginTop:"5px"}} onClick={()=>sendStudent()}>Submit</Button>
        <br></br>
        <Button variant="outlined" style={{ marginTop:"5px"}}>
            <Link to={"../classes/"+params.teacherName}>Back</Link>
        </Button>
        </>
    )
}

export default AddStudent