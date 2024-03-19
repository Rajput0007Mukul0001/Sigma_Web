
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyC7HCxmk5gVfPvOwg5_-71wh7Ckln6YJZQ",
    authDomain: "sigma-kart.firebaseapp.com",
    projectId: "sigma-kart",
    storageBucket: "sigma-kart.appspot.com",
    messagingSenderId: "942969630740",
    appId: "1:942969630740:web:71fd765f10b1adc6acf701"
  };

  

  // Use the existing app if it already exists, or initialize a new one
const app =  initializeApp(firebaseConfig);
const db = getFirestore(app);

// export default db;
export {db};



//   const app = (getApps().length < 1) 
//   ? firebase.initializeApp(firebaseConfig) 
//   : firebase.app();

// const db = app.firestore();

// export default db;
