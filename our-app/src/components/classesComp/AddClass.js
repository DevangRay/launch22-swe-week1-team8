import {useState} from 'react';
import {Grid, TextField, Button} from "@mui/material";
import './classes.css';
import {useNavigate} from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import {useEffect} from 'react';
import db from "../../firebase";

function AddClass() {
    const navigate = useNavigate();
    const collectionName = "classes";

    const defualtValues ={
        name: "",
        classsize: 0,
    }
    const [formValues, setFormValues] = useState(defualtValues);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    // const [isWrtten, setIsWritten] = useState(false);

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
        navigate("/classes");
    }

    const safeAsyncFunction = async () => {
        try {
          const docRef = await addDoc(collection(db, collectionName), {
            numberstudents: formValues.classsize,
            teacher: formValues.name,
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
            <h1>New Class Form</h1>
            <div className='addClassForm'>
                {/* <p>Please Enter Information to Create a New Class</p> */}
                <form onSubmit={handleSubmit}>
                <Grid container spacing={5} alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            required
                            id="name-input"
                            name="name"
                            label="Name"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="class-size-input"
                            name="classsize"
                            label="Class Size"
                            type="number"
                            value={formValues.classsize}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <div className='submitButton'>
                        <Button variant="contained" color="primary" type="submit" className='addClassbuttong'>
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

export default AddClass;