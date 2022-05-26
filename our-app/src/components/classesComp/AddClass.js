import {useState} from 'react';
import {Grid, TextField, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Select, MenuItem, Slider, Button} from "@mui/material";
import './classes.css';
import {useNavigate} from 'react-router-dom';
import WriteClass from './WriteClass';
import { addDoc, setDoc } from "firebase/firestore";
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
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setIsSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        setIsSubmitted(true);
    };

    function goBack() {
        navigate("/classes");
    }

    if (isSubmitted) {
        setDoc(addDoc(db, collectionName))
        //setIsSubmitted(false); //to reset the form
    }

    return(
        <div>
            <Button variant="outlined" onClick={goBack}> Go Back </Button>
            <div className='addClassForm'>
                <p>Here to Add a Class</p>
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
                    <div className='addClassButton'>
                        <Button variant="contained" color="primary" type="submit" className='addClassbuttong'>
                            Submit
                        </Button>
                    </div>
                </Grid>
                </form>
            </div>
            {isSubmitted && <WriteClass name={formValues.name} classsize={formValues.classsize}/>}
        </div>
    );
}

export default AddClass;