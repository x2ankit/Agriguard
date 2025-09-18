// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv6rnfVOYYHIbGuwnLIZTLOwj5dUX00J0",
  authDomain: "agridrone-sih-2025.firebaseapp.com",
  projectId: "agridrone-sih-2025",
  storageBucket: "agridrone-sih-2025.appspot.com", // ✅ correct bucket
  messagingSenderId: "596356413085",
  appId: "1:596356413085:web:e9c9985e2a858865370674",
  measurementId: "G-VBYE27ELJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
