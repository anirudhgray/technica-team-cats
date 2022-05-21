// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebase_api_key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: firebase_api_key,
  authDomain: "technica-team-cats.firebaseapp.com",
  projectId: "technica-team-cats",
  storageBucket: "technica-team-cats.appspot.com",
  messagingSenderId: "96834032162",
  appId: "1:96834032162:web:5789e6d9e700ca0aa7707b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
