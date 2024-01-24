import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 


const firebaseConfig = {
    apiKey: "AIzaSyBC90knewdGgnb3zrC0xcwL-w4gfSCF03c",
    authDomain: "heinkauth.firebaseapp.com",
    projectId: "heinkauth",
    storageBucket: "heinkauth.appspot.com",
    messagingSenderId: "708666546991",
    appId: "1:708666546991:web:2b282003afe55aa3979fda",
    measurementId: "G-2YGJDXJM26"
  };



firebase.initializeApp(firebaseConfig);
export default firebase;
