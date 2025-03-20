// Firebase SDK'yı içe aktar
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırma ayarları (Firebase Console'dan al)
const firebaseConfig = {
  apiKey: "AIzaSyC8_0JzA9XMoMuXdECOU0phiuHyrrrdVUo",
  authDomain: "shareopinion-f9460.firebaseapp.com",
  projectId: "shareopinion-f9460",
  storageBucket: "shareopinion-f9460.firebasestorage.app",
  messagingSenderId: "570120863741",
  appId: "1:570120863741:web:3c71a3e640e2510a0b6394",
  measurementId: "G-KD4R7MR550"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication'ı başlat
const db = getFirestore(app)

// `auth` nesnesini dışa aktar
export { auth, db };