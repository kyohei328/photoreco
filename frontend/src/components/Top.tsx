// import React, { useState, useEffect } from 'react'
import React from 'react'
// import { User } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from '../firebase'
import { css } from '@emotion/react'
import { UserAuth } from '../context/AuthContext';


const Styles = ({
  heightstyle: css ({
    height: '100vh',
    maxWidth: '1400px',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
})


const Top = () => {

  // const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  // const [user, setUser] = useState<User | null>(null);
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { user } = UserAuth();
  
  // useEffect(() => {
  //   const user = auth.currentUser;
  //   setUser(user);
  //   setCurrentUser(user);
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged( auth, (user) => {
  //       setCurrentUserId(user ? user.uid : null);
  //     });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  // console.log(`user: ${user}`)
  return (
    <div css={Styles.heightstyle} >
      {user ? <p>Email : {user.email}</p> : <p>No user data</p>}
    </div>
  )
}

export default Top
