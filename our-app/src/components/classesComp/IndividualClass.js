import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { Card, CardContent, Button } from "@mui/material";
import db from "../../firebase"
import Roster from "./Roster"

const IndividualClass = (props) =>{
    let params = useParams();
    const [classData, updateClassData] = useState([]);
    const [classDoc, updateClassDoc] = useState(null);
    //const [numStudents, updateNumStudents] = useState(0);

    const fetchClassData = () =>{
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('teacher', '==', params.teacherName));
        getDocs(q)
        .then((querySnapshot) => {
            updateClassDoc(querySnapshot.docs[0])
            return updateClassData(querySnapshot.docs[0].data());
        })
        //.then(pushNumStudents())
    }

    useEffect(()=>{
        fetchClassData();
    },[])

    // const pushNumStudents = () =>{
    //     const classesRef = collection(db, "classes");
    //     const q1 = query(classesRef, where('studentteacher', '==', params.teacherName));
    //     getDocs(q1)
    //     .then((querySnapshot) => {
    //         //updateNumStudents(querySnapshot.docs.length);
    //     })
    //     //const classesRef = collection(db, "classes");
    //     const q = query(classesRef, where('teacher', '==', params.teacherName));
    //     getDocs(q)
    //     .then((querySnapshot) => {
    //         setDoc(querySnapshot.docs[0].ref, {
    //         "numberstudents": numStudents > 0 ? numStudents : querySnapshot.docs[0].data().numberstudents,
    //         "teacher": params.teacherName,
    //     }); 
    //     })
    // }

    return (
    <>
    <h1>{params.teacherName}'s Class</h1>
    <div style={{margin:'auto', textAlign: 'center', display: 'inline-block'}}>
    <Card sx={{ maxWidth: 275}}>
        <CardContent>
            <h4>Number of Students</h4>
            {classData !== [] && <h5>{classData.numberstudents}</h5>}
        </CardContent>
    </Card>
    </div>
    <Roster teachername={params.teacherName}/>
    
    
    
    </>
    )
}

export default IndividualClass;