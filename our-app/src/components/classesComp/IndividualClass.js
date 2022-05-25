import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase"

const IndividualClass = (props) =>{
    let params = useParams();
    const [classData, updateClassData] = useState([]);

    const fetchClassData = () =>{
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('teacher', '==', params.teacherName.toString()));
        getDocs(q)
        .then((querySnapshot) => updateClassData(querySnapshot.data())) //only return first teacher if multiple results w/ name\
        .then(()=>console.log(Object.assign({}, classData)));
    }

    useEffect(()=>{
        fetchClassData();
    }, [])

    return (
    <>
    <h1>{params.teacherName}'s Class</h1>
    </>
    )
}

export default IndividualClass;