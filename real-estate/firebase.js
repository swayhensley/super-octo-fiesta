import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ Values pre-filled from your google-services.json (project: realtor-e3c59)
// 🔴 You still need to replace: apiKey, authDomain, appId
// Go to: Firebase Console → Project Settings → Your apps → Add Web App → copy config
// ✅ Firebase config — realtor-e3c59
const firebaseConfig = {
  apiKey: "AIzaSyDygkfXg694nklBG9c5SF0D4Fb84PWLuJE",
  authDomain: "realtor-e3c59.firebaseapp.com",
  projectId: "realtor-e3c59",
  storageBucket: "realtor-e3c59.firebasestorage.app",
  messagingSenderId: "727418600948",
  appId: "1:727418600948:web:4a8a81a060bfd0f2ba4da1",
  measurementId: "G-LRBQH6HPZ8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

