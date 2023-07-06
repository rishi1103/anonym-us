// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa5NDv9vk6j09BWqUudPl4HDyFU4O6pNY",
  authDomain: "anonym-us-in.firebaseapp.com",
  databaseURL: "https://anonym-us-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "anonym-us-in",
  storageBucket: "anonym-us-in.appspot.com",
  messagingSenderId: "97818248083",
  appId: "1:97818248083:web:696ba777f463cd64309e66",
  measurementId: "G-8CX4RMNYSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);


