import db from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

function Events(props) {
    // const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const month = props.month;
    const collectionName = "calendar";
    // const docID = "Holiday Kickoff!";
    // const calendarRef = collection(db, collectionName);
    // var unix;
    // var q = query(calendarRef, where("month", "==", month));

    // useEffect( () => {
    //     setIsLoading(true);
    //     getDoc(doc(db, collectionName, docID))
    //     .then((doc) => {
    //         console.log(doc.data());
    //         setData(doc.data());
    //     })
    //     .then(() => {
    //         setIsLoading(false);
    //     })
    // }, [])

    // async function getSnapshot() {
    //     // setIsLoading(true);
    //     const querySnapshot = await getDocs(q); 
    //     setIsLoading(false);
    //     return querySnapshot;
    // }

    useEffect ( () => {
        setIsLoading(true)
        getDocs(collection(db, collectionName))
        .then( (allDocs) => {
            allDocs.forEach((doc) => {
                if(doc.data()["Month"] === month) {
                    console.log(doc.data());
                }
            })
        })
        .then(() => {
            setIsLoading(false);
        })
    }, [month])

    if(!isLoading) {
        console.log("DONE")
    }
    
    // if (!isLoading) {
    //     unix = (Math.floor(((data["Date"]["seconds"]) % 31556926) /  2629743) + 1); //turn utc to month
    //     console.log(unix);
    //     q = query(calendarRef)
    // }


}

export default Events;