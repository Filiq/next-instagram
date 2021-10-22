// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu7m1F1FiJti4IspkiwysvnjO7HsuQMYY",
  authDomain: "instagram-b8137.firebaseapp.com",
  projectId: "instagram-b8137",
  storageBucket: "instagram-b8137.appspot.com",
  messagingSenderId: "677000667704",
  appId: "1:677000667704:web:cb89aca49c651995363ccd",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { app, db, storage };
