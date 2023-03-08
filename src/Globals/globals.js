import { ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, RealtimeDB } from "../firebase/firebase";

export const getBoardRef = () => {
  const [user] = useAuthState(auth);

  const boardRef = ref(RealtimeDB, `user/${user.uid}/boards`);

  return boardRef;
};
