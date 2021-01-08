import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';
var firebaseConfig = {
    apiKey: "AIzaSyBGAbxkT4f_eR3Cyhch872RWZkxoC8R_z8",
    authDomain: "fire2lips.firebaseapp.com",
    databaseURL: "https://fire2lips.firebaseio.com",
    projectId: "fire2lips",
    storageBucket: "fire2lips.appspot.com",
    messagingSenderId: "317460023774",
    appId: "1:317460023774:web:81578351d3e205a5d6b54f"
  };
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
const storage=firebase.storage();
const db=firebase.firestore();
const database=firebase.database();

 export {db,storage,database, firebase as default}