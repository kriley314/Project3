import firebase from "firebase";

const config = {
    apiKey: "AIzaSyA-bDokqobtYjA79qKSTJayR5LHzTJA7pA",
    authDomain: "catchup-d10e8.firebaseapp.com",
    databaseURL: "https://catchup-d10e8.firebaseio.com",
    projectId: "catchup-d10e8",
    storageBucket: "catchup-d10e8.appspot.com",
    messagingSenderId: "166801109359",
    appId: "1:166801109359:web:53b61b9c7d260a45"
};

firebase.initializeApp(config);

export default firebase;