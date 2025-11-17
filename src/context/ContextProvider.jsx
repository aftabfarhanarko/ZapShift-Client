import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AUthContex.";
import { auth } from "../firebase/firebase.config";
import { useEffect, useState } from "react";

const providergoogle = new GoogleAuthProvider();
const ContextProvider = ({ children }) => {
  const [loding, setLogind] = useState(false);
  const [user, setUser] = useState([]);

  const userCreat = (email, password) => {
    setLogind(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLogind(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogOut = () => {
    setLogind(false);
    return signOut(auth);
  };

  const profilesUpdeat = (pointrs) => {
    return updateProfile(auth.currentUser, pointrs);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, providergoogle);
  };

  useEffect(() => {
    const unsubccripet = onAuthStateChanged(auth, (currentUser) => {
      setLogind(true);
      setUser(currentUser);
      setLogind(false);
    });

    return () => {
      unsubccripet();
    };
  }, []);

  const userInfo = {
    userCreat,
    loginUser,
    userLogOut,
    profilesUpdeat,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
