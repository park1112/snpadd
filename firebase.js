// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb9ZULAVkieMK84_FHYWFQ3azO5pDwEq8",
  authDomain: "twitter-b44b2.firebaseapp.com",
  projectId: "twitter-b44b2",
  storageBucket: "twitter-b44b2.appspot.com",
  messagingSenderId: "455515435541",
  appId: "1:455515435541:web:47bcb1f0a1e2da142b941c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
