import { getDocs, query, QuerySnapshot } from "firebase/firestore";
import { useState } from "react";
import db from "../../firebase"
import { where, collection } from "firebase/firestore";

const Roster = (props) =>{
    const [roster, updateRoster] = useState([]);

    const fetchRoster = () =>{
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('studentteacher', '==', props.teachername));
        getDocs(q)
        .then((querySnapshot) => {
            console.log(querySnapshot);
        })
    }
    
    return(
        <></>
    )
}

export default Roster