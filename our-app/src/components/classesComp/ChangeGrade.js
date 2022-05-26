import { useParams } from "react-router-dom"
import { Input, Button } from "@mui/material";
import { useRef, useState } from "react";

const ChangeGrade = () =>{
    let params = useParams();
    let gradeRef = useRef();

    const [grade, updateGrade] = useState(params.grade);

    const changeGrade = () =>{
        updateGrade(gradeRef.current.value);
    }

    return(<>
        <h1>Change {params.studentName}'s Grade</h1>
        <Input defaultValue={grade} variant="" inputRef={gradeRef}></Input>
        <Button variant="contained" onClick={changeGrade}>Update</Button>
    </>)
}

export default ChangeGrade