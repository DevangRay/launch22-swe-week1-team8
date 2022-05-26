import { addDoc, setDoc } from "firebase/firestore";
import {useEffect} from 'react';
import db from "../../firebase";

function WriteClass(props) {

    return(
        <div>
            <p>Hello</p>
            <p>{props.name}</p>
            <p>{props.classsize}</p>
        </div>
    );
}

export default WriteClass;