import {useState} from 'react';
import {Grid, TextField, Button} from "@mui/material";
import './calendar.css';
import {useNavigate} from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import {useEffect} from 'react';
import db from "../../firebase";

export default function CreateEvent() {
    const navigate = useNavigate();
    const collectionName = "calendar";

    const defualtValues ={
        Date: "",
        Description: "",
        Link: "",
        Location: "",
        Month: "",
        Title: "",
        Timestamp: 0,
    }
    const [formValues, setFormValues] = useState(defualtValues);
    const [dataSubmitted, setDataSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        setDataSubmitted(true);
    };

    function goBack() {
        navigate("/calendar");
    }

    const safeAsyncFunction = async (timestampObject, month) => {
        try {
          const docRef = await addDoc(collection(db, collectionName), {
            Date: timestampObject,
            Description: formValues.Description,
            Link: formValues.Link,
            Location: formValues.Location,
            Month: month,
            Title: formValues.Title,
          });
          console.log("Document written with ID: ", docRef.id);
          setDataSubmitted(false);
        } catch (err) {
          console.log("async-error", err);
        }
      };

    function findTimestamp(date) {
        var timestamp = Date.parse(date);
        console.log("timestamp", timestamp);
        console.log("edited timestamp: ", timestamp - 62135587294)
        return timestamp;
    }

    function findMonth(timestamp) {
        var date = new Date(timestamp);
        console.log(date);
        var month = date.getMonth() + 1;
        console.log("Month: ", month.toString(10))
        return month.toString(10);
    }

    useEffect( () => {
        if(dataSubmitted) {
            setDataSubmitted(false);
            var timestamp = findTimestamp(formValues.Date);
            var timestampObject = {
                seconds: timestamp / 1000,
                nanoseconds: 0,
            }
            var month = findMonth(timestamp);
            setFormValues(defualtValues);
            safeAsyncFunction(timestampObject, month);
            // console.log(formValues);
        }
    }, [dataSubmitted])

    return(
        <div>
            <h1>New Event Form</h1>
            <div className='addEventForm'>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={5} alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            required
                            id="title-input"
                            name="Title"
                            label="Title"
                            type="text"
                            value={formValues.Title}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="location-input"
                            name="Location"
                            label="Location"
                            type="text"
                            value={formValues.Location}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <TextField
                            id="description-input"
                            name="Description"
                            label="Description"
                            type="text"
                            value={formValues.Description}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <TextField
                            id="image-input"
                            name="Link"
                            label="Image Link"
                            type="text"
                            value={formValues.Link}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="date-input"
                            name="Date"
                            label="MM/DD/YYYY"
                            type="text"
                            value={formValues.Date}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                    </Grid>

                    <div className='submitButton'>
                        <Button variant="contained" color="primary" type="submit" className='addClassbutton'>
                            Submit
                        </Button>
                    </div>
                </Grid>
                </form>
            </div>
            <Button variant="outlined" onClick={goBack} className='goBackButton'> Go Back </Button>
        </div>
    );
}