import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1vyzqInu0mpncxl0qtFiv1Afrdp_gjpY",
  authDomain: "chat-app-wa-251d2.firebaseapp.com",
  projectId: "chat-app-wa-251d2",
  storageBucket: "chat-app-wa-251d2.appspot.com",
  messagingSenderId: "565260954630",
  appId: "1:565260954630:web:dac6a02438e93ec5d46787",
  measurementId: "G-HKR6N27G6T",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
