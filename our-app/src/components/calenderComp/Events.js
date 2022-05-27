import db from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Button } from "@mui/material"

function Events(props) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [goDelete, setGoDelete] = useState(null);
    const month = props.month;
    const collectionName = "calendar";
    const array = [];

    const deleteClass = async () => {
        try {
          await deleteDoc(doc(db, collectionName, goDelete));
          console.log("deleted");
          setGoDelete(null);
        } catch (err) {
          console.log("async-error", err);
        }
      };

    useEffect ( () => {
        // if(goDelete === null) {
            setIsLoading(true)
            getDocs(collection(db, collectionName))
            .then( (allDocs) => {
                setData(allDocs);
            })
            .then(() => {
                setIsLoading(false);
                // timeSensativeAction();
            })
    }, [month, goDelete])

    useEffect( () => {
        if (goDelete !== null){
            deleteClass();
        }
    }, [goDelete])

    if(!isLoading) {
        data.forEach((doc) => {
            if(doc.data()["Month"] === month) {
                array.push({data: doc.data(), id: doc._key.path.segments[6]});
            }
        })
    }

    // array.forEach((event) => {
    //     console.log("event date unix:", event.data.Date.seconds)
    // })

    function translateToDate(unix) {
        const date = new Date(unix*1e3);
        return date.toLocaleDateString("en-US");
    }

    function setDelete(id) {
        array.forEach( (event) => {
            if (event.id === id) {
                setGoDelete(id);
            }
        })
    }

    return (
        <div>
            {/* {isLoading && <div className='loading'>
                <CircularProgress/>
            </div>} */}
            {array.map( (event) => (
                <div key={event.id}>
                    <EventCard className="calendarEvent" title={event.data.Title} date={translateToDate(event.data.Date.seconds)} location={event.data.Location} description={event.data.Description} src={event.data.Link}/>
                    <Button className='deleteButton' onClick={() => {setDelete(event.id)}}>Delete This Event</Button>
                </div>
            ))}
            <div className='breaker'></div>
        </div>
    );

}

export default Events;