import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFZzj959HNMKy1EnBuP_Kegcz3uirZatk",
  authDomain: "mahiiversion1.firebaseapp.com",
  projectId: "mahiiversion1",
  storageBucket: "mahiiversion1.firebasestorage.app",
  messagingSenderId: "1040474291619",
  appId: "1:1040474291619:web:ae9f30460c9568eaa3ae16",
  measurementId: "G-JF3KGBEHYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
