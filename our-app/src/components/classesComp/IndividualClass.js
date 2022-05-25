import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase"

const IndividualClass = (props) =>{
    let params = useParams();
    const [classData, updateClassData] = useState([]);

    const fetchClassData = () =>{
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('teacher', '==', "Smith"));
        getDocs(q)
        .then((querySnapshot) => {
            return updateClassData(querySnapshot.docs[0].data());
        });
    }

    useEffect(()=>{
        fetchClassData();
    }, [])

    return (
    <>
    <h1>{params.teacherName}'s Class</h1>
    <h3>Number of Students: </h3>
    <h5>{classData ? classData.numberstudents : "loading"}</h5>
    </>
    )
}

export default IndividualClass;