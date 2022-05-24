import db from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

function Events() {
    const [data, setData] = useState({});
    const collectionName = "calendar";
    const docID = "Blaze it!"

    useEffect( () => {
        // setIsLoading(true);
        getDoc(doc(db, collectionName, docID))
        .then((doc) => {
            console.log(doc.data());
            // setIsLoading(false);
            setData(doc.data());
        })
    }, [db])


}

export default Events;