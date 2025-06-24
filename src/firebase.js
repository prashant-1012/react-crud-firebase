// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// 🔑 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyComOhaclXMYnPdJtVOtxwRN4wq4H7NB4k",
  authDomain: "react-crud-tailwind-prashant.firebaseapp.com",
  projectId: "react-crud-tailwind-prashant",
  storageBucket: "react-crud-tailwind-prashant.firebasestorage.app",
  messagingSenderId: "469234108358",
  appId: "1:469234108358:web:fedc5b84749f352e7d14c7",
  // ⬇️ Add this line manually:
  databaseURL: "https://react-crud-tailwind-prashant-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔗 Initialize Realtime Database
export const db = getDatabase(app);
