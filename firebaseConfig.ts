/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.VITE_FIREBASE_API_KEY,
//   authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VITE_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAVpLtd1EbbP2LBQ1BYmoPCRbGWx-E9w7w",
  authDomain: "graphicvortex-1e1e3.firebaseapp.com",
  projectId: "graphicvortex-1e1e3",
  storageBucket: "graphicvortex-1e1e3.firebasestorage.app",
  messagingSenderId: "901456916552",
  appId: "1:901456916552:web:50747282f3230ffac7a87d",
  measurementId: "G-LY6P273BLC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

