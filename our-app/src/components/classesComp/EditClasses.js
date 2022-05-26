import {useNavigate} from 'react-router-dom';
import { Button } from "@mui/material"
import ClassesTable from "./ClassesTable"

const EditClasses = (props) =>{
    const navigate = useNavigate();

    function goToAddClass() {
        navigate("/add-class")
    }

    return(<>
    <Button variant="outlined" onClick={goToAddClass}> Add Classes </Button>
    <ClassesTable />
    </>)
}

export default EditClasses