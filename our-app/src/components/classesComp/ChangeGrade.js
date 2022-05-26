import { useParams } from "react-router-dom"
import { Input } from "@mui/material";
import { useState } from "react";

const ChangeGrade = () =>{
    let params = useParams();
    const [grade, updateGrade] = useState(params.grade);

    return(<>
        <h1>Change {params.studentName}'s Grade</h1>
        <Input value={grade}></Input>
    </>)
}

export default ChangeGrade