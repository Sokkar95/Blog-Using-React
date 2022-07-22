import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBABz9TUKma4ddvNxlCDEIhfPNajFPzxyo",
  authDomain: "blog-52eb0.firebaseapp.com",
  projectId: "blog-52eb0",
  storageBucket: "blog-52eb0.appspot.com",
  messagingSenderId: "1069764102894",
  appId: "1:1069764102894:web:ddc39173dbc505739a01ff"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);