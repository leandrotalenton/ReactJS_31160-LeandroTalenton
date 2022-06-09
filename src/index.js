import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';




/* firebase_____________________________________________________________ */
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey:process.env.REACT_APP_APIKEY,
  authDomain:process.env.REACT_APP_AUTHDOMAIN,
  projectId:process.env.REACT_APP_PROJECTID,
  storageBucket:process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
  appId:process.env.REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)  /* esto antes estaba en appContext */

/* firebase_____________________________________________________________ */

createRoot(
  document.getElementById('root')
).render(
  <App />
)
