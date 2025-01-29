import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebaseConfig';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor de contexto para envolver la aplicación
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);  // Aquí pasamos la instancia de Firebase

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);   // Establecer el usuario actual
            setLoading(false);       // Terminar la carga
        });

        return () => unsubscribe();  // Limpiar suscripción
    }, [auth]);

    // Proveer los valores del contexto
    return (
        <AuthContext.Provider value={{ currentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};





