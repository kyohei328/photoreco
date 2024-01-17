import { useContext, createContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, provider } from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [signInCheck, setSignInCheck] = useState(false);

  const googleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
      setUser(currentUser);
      setSignInCheck(true);
    } else {
      setSignInCheck(true);
      setUser(currentUser);
    }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (signInCheck) {
    return (
      <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const UserAuth = () => {
  return useContext(AuthContext);
};