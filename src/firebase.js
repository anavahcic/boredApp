// firebase.js
import { initializeApp } from 'firebase/app';

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
  apiKey: "http://www.boredapi.com/api/activity/",
  authDomain: "bored-app-11890.firebaseapp.com",
  databaseURL: "https://bored-app-11890-default-rtdb.firebaseio.com/",
  projectId: "bored-app-11890",
  storageBucket: "bored-app-11890.appspot.com",
  messagingSenderId: "365462959557"
};

// setting a variable that initializes our application
const firebase = initializeApp(config);
// this exports the CONFIGURED version of firebase
export default firebase;