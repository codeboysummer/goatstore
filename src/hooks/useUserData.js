import { db, auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { orderBy, limit } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { setUsername } from "../redux/reducers";
// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      try {
        const collectionref = doc(db, `users/${user.uid}`);
        unsubscribe = onSnapshot(collectionref, (doc) => {
          dispatch(setUsername(doc.data()?.username));
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(setUsername(null));
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
export async function getUserWithUsername(username) {
  try {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("username", "==", username), limit(1));

    const userDoc = await getDocs(q);

    return userDoc;
  } catch (error) {
    console.log(error);
  }
}
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
export function sortByMostLoved(stateSetter, currentState) {}
