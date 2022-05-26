import {useState} from 'react';
import {Grid, TextField, Button} from "@mui/material";
import './directory.css';
import {useNavigate} from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import {useEffect} from 'react';
import db from "../../firebase";

export default function AddTeacher() {
    const navigate = useNavigate();
    const collectionName = "directory";

    const defualtValues ={
        first: "",
        last: "",
        profile: "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-picture-icon-png-people-person-profile--4.png",
        role: "Teacher",
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
        navigate("/directory");
    }

    const safeAsyncFunction = async () => {
        try {
          const docRef = await addDoc(collection(db, collectionName), {
            first: formValues.first,
            last: formValues.last,
            role: "Teacher",
            profile: formValues.profile,
          });
          console.log("Document written with ID: ", docRef.id);
          setDataSubmitted(false);
        } catch (err) {
          console.log("async-error", err);
        }
      };

    useEffect( () => {
        if(dataSubmitted) {
            setDataSubmitted(false);
            safeAsyncFunction();
        }
    }, [dataSubmitted])

    return(
        <div>
            <h1>New Teacher Form</h1>
            <div className='addStudentForm'>
                {/* <p>Please Enter Information to Create a New Class</p> */}
                <form onSubmit={handleSubmit}>
                <Grid container spacing={5} alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            required
                            id="first-name-input"
                            name="first"
                            label="First Name"
                            type="text"
                            value={formValues.first}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="last-name-input"
                            name="last"
                            label="Last Name"
                            type="text"
                            value={formValues.last}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <div className='submitButton'>
                        <Button variant="contained" color="primary" type="submit" className='addStudentbutton'>
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