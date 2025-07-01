// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
apiKey: "AIzaSyAddvd-pRVnhUeEDnOkemtrGhZyPlydnhM",
  authDomain: "notificaciones-guia.firebaseapp.com",
  projectId: "notificaciones-guia",
  storageBucket: "notificaciones-guia.firebasestorage.app",
  messagingSenderId: "655356370425",
  appId: "1:655356370425:web:f14d3b20ff477112d57128",
  measurementId: "G-GHGRKEHM4F"
});

const messaging = firebase.messaging();
