
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
//import 'firebase/firestore'
   var firebaseConfig = {
    apiKey: "AIzaSyBURIJa3V8NIV51NUss3gXWMTdWnAI3zT4",
    authDomain: "edu1-52b30.firebaseapp.com",
    databaseURL: "https://edu1-52b30.firebaseio.com",
    projectId: "edu1-52b30",
    storageBucket: "edu1-52b30.appspot.com",
    messagingSenderId: "384400786106",
    appId: "1:384400786106:web:0b812f34998925d3b67883",
    measurementId: "G-8J80W3SMPH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase;