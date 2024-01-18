// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtjRPrBOp0RmAMIyJFDw6xu5dRWYjxHLU",
  authDomain: "alphabi-6e5c9.firebaseapp.com",
  databaseURL: "https://alphabi-6e5c9-default-rtdb.firebaseio.com",
  projectId: "alphabi-6e5c9",
  storageBucket: "alphabi-6e5c9.appspot.com",
  messagingSenderId: "515846853885",
  appId: "1:515846853885:web:de7e987d1e4056f1f35a94",
  measurementId: "G-2QK7ZC3593",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
