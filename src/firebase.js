import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "deckbuilder-ivion.firebaseapp.com",
  projectId: "deckbuilder-ivion",
  storageBucket: "deckbuilder-ivion.appspot.com",
  messagingSenderId: "509900701720",
  appId: "1:509900701720:web:48950880838353b83ac36d",
  measurementId: "G-WXNHSGGVNZ",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const st = getStorage();

export { db, st };
