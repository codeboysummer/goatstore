import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
const auth = getAuth(app);
export const db = getFirestore(app);

// helper functions

// AUTH

export const SigninWithEmailandPassword = async (email, password) => {
  // firebase function
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const RegisterWithEmailandPassword = async (
  email,
  password,
  navigate
) => {
  // firebase function
  try {
    createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) console.log(error);

    if (navigate) navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// need debounce function to check for username
