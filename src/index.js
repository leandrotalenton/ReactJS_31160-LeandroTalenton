import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* firebase_____________________________________________________________ */
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCRvCAWCH0l0DpC0V_Rp9iluIdTc0kcK3o",
  authDomain: "react31160lt.firebaseapp.com",
  projectId: "react31160lt",
  storageBucket: "react31160lt.appspot.com",
  messagingSenderId: "1068515795747",
  appId: "1:1068515795747:web:7b7e25961809b64841e296"
};

const app = initializeApp(firebaseConfig);
/* firebase_____________________________________________________________ */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
