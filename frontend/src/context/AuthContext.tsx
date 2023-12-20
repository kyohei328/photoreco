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
      console.log('User', currentUser)
    } else {
      setSignInCheck(true);
      setUser(currentUser);
    }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setSignInCheck(true);
  //     console.log('User', currentUser)
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  if (signInCheck) {
    return (
      <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
        {children}
      </AuthContext.Provider>
    );
  }
    // return (
    //   <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
    //     {children}
    //   </AuthContext.Provider>
    // );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};