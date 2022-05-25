import db from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

function Directory() {
    const [data, setData] = useState();
    const collectionName = "directory";

    const safeAsyncFunction = async () => {
        try {
          const allDocs = await getDocs(collection(db, collectionName))
          setData(allDocs);
          console.log("async-results", data);
        } catch (err) {
          console.log("async-error", err);
        }
      };

      useEffect( () => {
          safeAsyncFunction();
      }, [])

      /*
      useEffect ( () => {
        setIsLoading(true)
        getDocs(collection(db, collectionName))
        .then( (allDocs) => {
            setData(allDocs);
        })
        .then(() => {
            timeSensativeAction();
        })
    }, [month])*/
}

export default Directory;