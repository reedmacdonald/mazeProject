import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAGZWM9LZ3kIBgiuzoVn7zxKDTBeUadKDY",
    authDomain: "mazepage-cfdfb.firebaseapp.com",
    databaseURL: "https://mazepage-cfdfb.firebaseio.com",
    projectId: "mazepage-cfdfb",
    storageBucket: "mazepage-cfdfb.appspot.com",
    messagingSenderId: "542006424721",
    appId: "1:542006424721:web:66d741f848d649a7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase