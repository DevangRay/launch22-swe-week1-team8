import db from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import EventCard from './EventCard';

function Events(props) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const month = props.month;
    const collectionName = "calendar";
    const array = [];

    const delay = (ms) => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      async function timeSensativeAction(){ //must be async func
        await delay(50) //wait 5 seconds
        setIsLoading(false);
        //continue on...
      }

    useEffect ( () => {
        setIsLoading(true)
        getDocs(collection(db, collectionName))
        .then( (allDocs) => {
            setData(allDocs);
        })
        .then(() => {
            timeSensativeAction();
        })
    }, [month])

    if(!isLoading) {
        data.forEach((doc) => {
            if(doc.data()["Month"] === month) {
                array.push(doc.data());
                console.log(doc.data().Dates);
            }
        })
    }

    console.log(array);

    function translateToDate(unix) {
        // console.log("UNIX", unix);
        unix = unix - 62135587294; //subtracts 1969 years in seconds
        // console.log(unix === 1669316400);
        // console.log("unix date", unix);
        const date = new Date(unix*1e3);
        // console.log("final date", date.toLocaleDateString("en-US"))
        return date.toLocaleDateString("en-US");
    }

    return (
        <div>
            {/* {isLoading && <div className='loading'>
                <CircularProgress/>
            </div>} */}
            {array.map( (event) => (
                <div>
                    <EventCard title={event.Title} date={translateToDate(event.Date)} location={event.Location} description={event.Description} src={event.Link}/>
                </div>
            ))}
        </div>
    );

}

export default Events;