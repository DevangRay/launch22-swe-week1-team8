import {useNavigate} from 'react-router-dom';
import { Button } from "@mui/material"
import ClassesTable from "./ClassesTable"
import './classes.css';

const EditClasses = (props) =>{
    const navigate = useNavigate();

    function goToAddClass() {
        navigate("/add-class")
    }

    return(<>
    <Button variant="outlined" onClick={goToAddClass} className='addClassButton'> Add Classes </Button>
    <ClassesTable />
    </>)
}

export default EditClasses