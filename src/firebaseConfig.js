import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAXH0YUX24fpX_YtAptxwMOP8T89aKfbYM",
    authDomain: "flatfinder-ebcc4.firebaseapp.com",
    projectId: "flatfinder-ebcc4",
    storageBucket: "flatfinder-ebcc4.firebasestorage.app",
    messagingSenderId: "1049242656808",
    appId: "1:1049242656808:web:a0dc70c0926e6d8c1b951d",
    measurementId: "G-RQMQB43H3P"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth y Firestore
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta la aplicación y los servicios que necesites
export { app, db, auth };

// Función para obtener los datos del usuario
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

