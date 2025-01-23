import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAXH0YUX24fpX_YtAptxwMOP8T89aKfbYM",
    authDomain: "flatfinder-ebcc4.firebaseapp.com",
    projectId: "flatfinder-ebcc4",
    storageBucket: "flatfinder-ebcc4.firebasestorage.app",
    messagingSenderId: "1049242656808",
    appId: "1:1049242656808:web:a0dc70c0926e6d8c1b951d",
    measurementId: "G-RQMQB43H3P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const getUserDataFromFirebase = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId); 
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }

    return null;
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    throw error; 
  }
};

export { db, auth };










