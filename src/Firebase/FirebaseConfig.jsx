

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAi9LDd26sbPv1QR1C-9B0MWf_MFrJegk8",
  authDomain: "knowledge-tour-6c302.firebaseapp.com",
  projectId: "knowledge-tour-6c302",
  storageBucket: "knowledge-tour-6c302.appspot.com",
  messagingSenderId: "1035987187700",
  appId: "1:1035987187700:web:b1b6fae94cb191dd14aba1"
};


const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {fireDb, auth, storage}