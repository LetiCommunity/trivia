// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth  } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARL1aWtVKUuaYBLrA11o56DTQ7UWz8oDw",
  authDomain: "trivia-f50aa.firebaseapp.com",
  projectId: "trivia-f50aa",
  storageBucket: "trivia-f50aa.appspot.com",
  messagingSenderId: "722481949474",
  appId: "1:722481949474:web:87fb2e7b2227c1cf0d937b",
  measurementId: "G-8QD4DJ1BSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;