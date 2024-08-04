// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNiRodyk8cjTRjt6kBC3z_pko0VeGAhLg",
  authDomain: "ai-travel-planner-182e5.firebaseapp.com",
  projectId: "ai-travel-planner-182e5",
  storageBucket: "ai-travel-planner-182e5.appspot.com",
  messagingSenderId: "933750084077",
  appId: "1:933750084077:web:7fcdd46d3c3a0eb33d57e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);