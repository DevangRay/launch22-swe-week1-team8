import { useParams, Link } from "react-router-dom"
import { Input, Button } from "@mui/material";
import { useRef, useState } from "react";
import db from "../../firebase";
import { setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";

const ChangeGrade = (props) =>{
    let params = useParams();
    let gradeRef = useRef();

    const [grade, updateGrade] = useState(params.grade);

    const pushGradeChange = (newValue) =>{
        //retrieve doc
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('studentname', '==', params.studentName));
        getDocs(q)
        .then((querySnapshot) => {
            console.log(querySnapshot.docs[0].ref);
            setDoc(querySnapshot.docs[0].ref, {"grade": parseFloat(newValue), 
            "studentname": params.studentName,
            "studentteacher": params.studentTeacher
        }); 
        })

    }

    const changeGrade = () =>{
        updateGrade(gradeRef.current.value);
        pushGradeChange(gradeRef.current.value);
    }

    return(<>
        <h1>Change {params.studentName}'s Grade</h1>
        <Input defaultValue={grade} variant="" inputRef={gradeRef}></Input>
        <Button variant="contained" onClick={changeGrade}>Update</Button>
        <br></br>
        <Button variant="outlined" style={{marginTop:"5px"}}><Link to={"../classes/"+params.studentTeacher}>Back</Link></Button>
    </>)
}

export default ChangeGrade