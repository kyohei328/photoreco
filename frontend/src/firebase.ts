import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_SENDER_ID,

  // apiKey: "AIzaSyCCw7hDwmVa01_qoqOA8mJaJYxUDqtC5ho",
  // authDomain: "photospace-f0073.firebaseapp.com",
  // projectId: "photospace-f0073",
  // storageBucket: "photospace-f0073.appspot.com",
  // messagingSenderId: "672790559888",
  // appId: "1:672790559888:web:bed3ddbda5a5ea35d6ac15",
  // measurementId: "G-6KKPC068VY"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { provider, auth }

