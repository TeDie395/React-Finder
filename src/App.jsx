// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from "./AuthContext"; // Asegúrate de tener un hook useAuth que permita acceder al estado de autenticación
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import ProfileUpdatePage from './Pages/ProfileUpdatePage';
import MyFlats from './Pages/MyFlats';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth(); // Suponiendo que useAuth devuelve el usuario actual
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />  {/* Redirige a /home en lugar de /login */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />  {/* Protege la ruta de perfil */}
                    <Route path="/profile/update/:userId" element={<ProtectedRoute><ProfileUpdatePage /></ProtectedRoute>} />  {/* Protege la ruta de actualización */}
                    <Route path="/my-flats" element={<MyFlats />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;














