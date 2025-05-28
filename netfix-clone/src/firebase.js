// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJCkWdttpLr-B0z10umohjuaPx7WfqVmI",
  authDomain: "zynema-afceb.firebaseapp.com",
  projectId: "zynema-afceb",
  storageBucket: "zynema-afceb.firebasestorage.app",
  messagingSenderId: "547385360531",
  appId: "1:547385360531:web:460bc6edfc6b7100c28d66",
  measurementId: "G-393G4K5HCH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
