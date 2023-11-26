// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth  } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3ixzEl3HK6v0qYt3Vo6-oVnDTFfpW7cw",
  authDomain: "trivia-5f881.firebaseapp.com",
  projectId: "trivia-5f881",
  storageBucket: "trivia-5f881.appspot.com",
  messagingSenderId: "301875373906",
  appId: "1:301875373906:web:69520470da8c9bd6f77c8b",
  measurementId: "G-LZJZXMEK0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;