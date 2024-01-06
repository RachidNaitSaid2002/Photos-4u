// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY42iQS5hj-Vb8McCNMil4VS9WVpHvrM8",
  authDomain: "worldnews-87934.firebaseapp.com",
  projectId: "worldnews-87934",
  storageBucket: "worldnews-87934.appspot.com",
  messagingSenderId: "442376149306",
  appId: "1:442376149306:web:31131d4a12e0210b5d9803",
  measurementId: "G-PVMYB5X96D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signgoogle = () => {
  auth.signInWithPopup(provider)
};