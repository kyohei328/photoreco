// import { useEffect } from 'react';
// import { createContext, useState, useContext } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase';


// const AuthContext = createContext();

// export function useAuthContext() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState('');

//   const value = {
//     user,
//   };

//   useEffect(() => {
//     const unsubscribed = onAuthStateChanged(auth, (user) => {
//       console.log(user);
//       setUser(user);
//     });
//     return () => {
//       unsubscribed();
//     };
//   }, []);
  
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// };

import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  // signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider)
  };

  const logOut = () => {
      signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};