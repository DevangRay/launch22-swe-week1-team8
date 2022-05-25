import { getDocs, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase"
import { where, collection } from "firebase/firestore";

const Roster = (props) =>{
    const [roster, updateRoster] = useState([]);

    const fetchRoster = () =>{
        updateRoster((roster)=>[])
        const classesRef = collection(db, "classes");
        const q = query(classesRef, where('studentteacher', '==', props.teachername));
        getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((entry)=>{
                updateRoster((roster)=>[...roster, entry.data()])
            })
        })
    }

    useEffect(()=>{
        fetchRoster();
    }, [])
    
    return(
        <></>
    )
}

export default Roster