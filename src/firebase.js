// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQGbTn21FhnYPBlMa1jc6BikNMuLq1r-4",
  authDomain: "netflix-clone-65951.firebaseapp.com",
  projectId: "netflix-clone-65951",
  storageBucket: "netflix-clone-65951.appspot.com",
  messagingSenderId: "453373215223",
  appId: "1:453373215223:web:d59ac1e0ee83b6ff786ef2",
  measurementId: "G-Y88H4V4J5M",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
