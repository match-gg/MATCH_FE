// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // apiKey: 'AIzaSyAHBQRY5-45s3J0cyi4CnXkrMgRiRKgOmc',
  // authDomain: 'react-firebase-chat-1606c.firebaseapp.com',
  // projectId: 'react-firebase-chat-1606c',
  // storageBucket: 'react-firebase-chat-1606c.appspot.com',
  // messagingSenderId: '287834165303',
  // appId: '1:287834165303:web:6e418cdcfdd64b97112fb2',
  // measurementId: 'G-15RXB91MYB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const fdb = getDatabase();
export default app;
