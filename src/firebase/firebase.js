import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import {
  addDoc,
  getFirestore,
  collection,
  doc,
  writeBatch,
} from "firebase/firestore";
import {getDatabase} from 'firebase/database'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxZ-rZgCwF8zJPAJFTbe0qp-K9uLmFgc8",
  authDomain: "trellow-10eb6.firebaseapp.com",
  projectId: "trellow-10eb6",
  storageBucket: "trellow-10eb6.appspot.com",
  messagingSenderId: "306990175597",
  appId: "1:306990175597:web:2c0b20979bb6ce25a07664",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const RealtimeDB=getDatabase(app)


// helper functions


export const googleAuthProvider=new GoogleAuthProvider()// AUTH



// need debounce function to check for username
