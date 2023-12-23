// Import the functions you need from the SDKs you need
const { initializeApp } =require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB_3c2uQuTGw14avDTt4vP4-mfCPmuII4",
  authDomain: "servisso.firebaseapp.com",
  projectId: "servisso",
  storageBucket: "servisso.appspot.com",
  messagingSenderId: "416973749351",
  appId: "1:416973749351:web:8cba2aabf21ef67dc1a8c2"
};

const { getFirestore } = require('firebase/firestore/lite');

// Initialize Firebase
module.exports = getFirestore(initializeApp(firebaseConfig));