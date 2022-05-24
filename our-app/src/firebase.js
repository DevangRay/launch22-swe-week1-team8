import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
    // apiKey: "AIzaSyDXfJVrhtgm3hosNz5MX_gWI0daP5hXg28",
    // authDomain: "tj-es-5c5d4.firebaseapp.com",
    // projectId: "tj-es-5c5d4",
    // storageBucket: "tj-es-5c5d4.appspot.com",
    // messagingSenderId: "290810102330",
    // appId: "1:729658667539:web:3d2a1266c400cb98dd85e6"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  export default db