// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3UMXRGMwDVnjCaMwNhHtBgVgmncStoCA",
  authDomain: "nft4note.firebaseapp.com",
  projectId: "nft4note",
  storageBucket: "nft4note.appspot.com",
  messagingSenderId: "367769822769",
  appId: "1:367769822769:web:06174bb8a3b18218fb5710"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;