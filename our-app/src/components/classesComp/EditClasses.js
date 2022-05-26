import {useNavigate} from 'react-router-dom';
import { Button } from "@mui/material"
import ClassesTable from "./ClassesTable"

const EditClasses = (props) =>{
    const navigate = useNavigate();

    function goToAddClass() {
        navigate("/add-class")
    }
    // function goToRemoveClass() {
    //     navigate('/remove-class');
    // }

    return(<>
    <Button variant="outlined" onClick={goToAddClass}> Add Classes </Button>
    {/* <Button variant="outlined" onClick={goToRemoveClass}> Remove Classes </Button> */}
    <ClassesTable />
    </>)
}

export default EditClasses