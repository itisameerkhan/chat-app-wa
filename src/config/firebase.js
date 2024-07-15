import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrBo_10n3OTK2l-tVAEyW0ob_Cz0JpdHw",
  authDomain: "chat-app-wa-45a92.firebaseapp.com",
  projectId: "chat-app-wa-45a92",
  storageBucket: "chat-app-wa-45a92.appspot.com",
  messagingSenderId: "757618481610",
  appId: "1:757618481610:web:592e1f82f39407f2ba5733",
  measurementId: "G-P630T1FRDW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider(app);
