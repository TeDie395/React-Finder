import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Importa getFirestore, doc y getDoc

const firebaseConfig = {
  // Tu configuración de Firebase
  apiKey: "AIzaSyAXH0YUX24fpX_YtAptxwMOP8T89aKfbYM",
  authDomain: "flatfinder-ebcc4.firebaseapp.com",
  projectId: "flatfinder-ebcc4",
  storageBucket: "flatfinder-ebcc4.firebasestorage.app",
  messagingSenderId: "1049242656808",
  appId: "1:1049242656808:web:a0dc70c0926e6d8c1b951d",
  measurementId: "G-RQMQB43H3P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Asegúrate de definir getFirestore

// Añadir la función getUserDataFromFirebase
export async function getUserDataFromFirebase() {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error('No user data found!');
      }
    } else {
      throw new Error('No authenticated user!');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

