import React, { useState, useEffect } from 'react'
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'



const Top = () => {

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const user = auth.currentUser;
    setUser(user);
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth, (user) => {
        setCurrentUserId(user ? user.uid : null);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {currentUser ? <p>Email : {currentUser.email}</p> : <p>No user data</p>}
    </div>
  )
}

export default Top
