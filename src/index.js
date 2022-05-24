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
  apiKey: "AIzaSyCRvCAWCH0l0DpC0V_Rp9iluIdTc0kcK3o",
  authDomain: "react31160lt.firebaseapp.com",
  projectId: "react31160lt",
  storageBucket: "react31160lt.appspot.com",
  messagingSenderId: "1068515795747",
  appId: "1:1068515795747:web:7b7e25961809b64841e296"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)  /* esto antes estaba en appContext */

/* firebase_____________________________________________________________ */

createRoot(
  document.getElementById('root')
).render(
  <App />
)
