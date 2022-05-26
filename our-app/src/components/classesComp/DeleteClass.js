import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import {useEffect} from "react";

function DeleteClass(props) {
    const name = props.name;
    const collectionName= "classes"

    const safeAsyncFunction = async () => {
        try {
          const allDocs = await getDocs(collection(db, collectionName))
          console.log(allDocs);
        } catch (err) {
          console.log("async-error", err);
        }
      };

    useEffect( () => {
        safeAsyncFunction();
    }, [])
}

export default DeleteClass;