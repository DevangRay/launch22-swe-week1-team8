import db from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import CircularProgress from '@mui/material/CircularProgress';

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
        await delay(300) //wait 5 seconds
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
            }
        })
    }

    function translateToDate(unix) {
        unix = unix - 62135587294; //subtracts 1969 years in seconds
        const date = new Date(unix*1000);
        return date.toLocaleDateString("en-US");
    }

    return (
        <div>
            {isLoading && <div className='loading'>
                <CircularProgress/>
            </div>}
            {array.map( (event) => (
                <div>
                    <EventCard title={event.Title} date={translateToDate(event.Date)} location={event.Location} description={event.Description} src={event.Link}/>
                </div>
            ))}
        </div>
    );

}

export default Events;