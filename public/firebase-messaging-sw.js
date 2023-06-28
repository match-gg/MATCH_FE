/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js'
);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// onBackgroundMessage(messaging, (payload) => {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "./logo192.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
