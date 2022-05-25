import { useParams } from "react-router-dom";

const IndividualClass = (props) =>{
    let params = useParams();
    return (
    <>
    <h1>{params.teacherName}'s Class</h1>
    <span></span>
    <br></br>
    <h1>A</h1>
    </>
    )
}

export default IndividualClass;