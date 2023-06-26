/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../src/store/notification-slice';

importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging.js'
);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

// 백그라운드 상태에서 메세지 수신
onBackgroundMessage(messaging, (payload) => {
  // dispatch 동작 안함...
  const dispatch = useDispatch();
  dispatch(notificationActions.ADD_BACKGROUND_MSG(payload));
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
