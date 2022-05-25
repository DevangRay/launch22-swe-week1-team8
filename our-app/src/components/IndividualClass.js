import { useParams } from "react-router-dom";

const IndividualClass = (props) =>{
    let params = useParams();
    return <h1>{params.teacherName}'s Class</h1>
}

export default IndividualClass;