import db from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import EventCard from './EventCard';

function Events(props) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const month = props.month;
    const collectionName = "calendar";
    const array = [];
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
        // .then( (allDocs) => {
        //     allDocs.forEach((doc) => {
        //         if(doc.data()["Month"] === month) {
        //             console.log(doc.data());
        //             array.push(doc.data());
        //             // setData(doc.data());
        //             // console.log("Found data");
        //             // console.log('pushed to array');
        //         }
        //     })
        // })
        .then( (allDocs) => {
            console.log(allDocs);
            setData(allDocs);
        })
        .then(() => {
            setIsLoading(false);
        })
    }, [month])

    if(!isLoading) {
        console.log("DONE")
        data.forEach((doc) => {
            if(doc.data()["Month"] === month) {
                console.log(doc.data());
                array.push(doc.data());
            }
        })
    }
    console.log(array);
    
    function translateToDate(unix) {
        unix = unix - 62135587294; //subtracts 1969 years in seconds
        const date = new Date(unix*1000);
        return date.toLocaleDateString("en-US");
    }

    // if (!isLoading) {
    //     unix = (Math.floor(((data["Date"]["seconds"]) % 31556926) /  2629743) + 1); //turn utc to month
    //     console.log(unix);
    //     q = query(calendarRef)
    // }
    return (
        <div>
            {array.map( (event) => (
                <div>
                    {/* <p>{event.Title}</p>
                    <p>{translateToDate(event.Date)}</p>
                    <p>{event.Location}</p>
                    <p>{event.Description}</p> */}
                    <EventCard title={event.Title} date={translateToDate(event.Date)} location={event.Location} description={event.Description} src={event.Link}/>
                </div>
            ))}
        </div>
    );

}

export default Events;