// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpZB8PkIwyp22ar9PVqIpF4zipdue8jP8",
  authDomain: "task-management-client-side.firebaseapp.com",
  projectId: "task-management-client-side",
  storageBucket: "task-management-client-side.appspot.com",
  messagingSenderId: "385111267928",
  appId: "1:385111267928:web:f5b70499f17f349c4c082d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;