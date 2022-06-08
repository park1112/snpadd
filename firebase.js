// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// 파이어베이스 새로만들면 comfig 있음
const firebaseConfig = {
  apiKey: 'AIzaSyC0X5YmE2jIk6hxdfYY11aMd3U9Fyyr9xc',
  authDomain: 'snpcompany-a1d73.firebaseapp.com',
  projectId: 'snpcompany-a1d73',
  storageBucket: 'snpcompany-a1d73.appspot.com',
  messagingSenderId: '889327520077',
  appId: '1:889327520077:web:2bd0fee034e9faefc08f04',
  measurementId: 'G-NPC9RT3BG7',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
