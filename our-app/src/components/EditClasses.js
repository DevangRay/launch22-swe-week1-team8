import { Button } from "@mui/material"
import ClassesTable from "./ClassesTable"

const EditClasses = (props) =>{
    return(<>
    <Button variant="outlined">Add Class</Button>
    <Button variant="outlined">Remove Class</Button>
    <ClassesTable />
    </>)
}

export default EditClasses