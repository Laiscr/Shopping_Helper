// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCEzKfUHHbAFj1X-tq76wiEFlLTSmPP4KA",
  authDomain: "shoppinghelper-e092c.firebaseapp.com",
  projectId: "shoppinghelper-e092c",
  storageBucket: "shoppinghelper-e092c.appspot.com",
  messagingSenderId: "539865589572",
  appId: "1:539865589572:web:3cf0c1891942ead419d911"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const storage = getSorage(app);
