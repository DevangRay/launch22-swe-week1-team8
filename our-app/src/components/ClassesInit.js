import { useEffect, useState } from "react";
import Classes from "./Classes";
import { initializeApp } from "firebase/app";

const ClassesInit = (props) =>{
    const [db, setDb] = useState(null);

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId,
      };
      
    useEffect(()=>{
        app = initializeApp(firebaseConfig);
        setDb(app);
    }, [])

    return <Classes db={db} />
}

export default ClassesInit;