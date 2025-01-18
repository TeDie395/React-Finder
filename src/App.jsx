import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'; // Importa LoginPage de manera correcta
import RegisterPage from './Pages/RegisterPage'; // Importa RegisterPage de manera correcta
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import ProfileUpdatePage from './Pages/ProfileUpdatePage'; // Importa el nuevo componente

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/update/:userId" element={<ProfileUpdatePage />} /> {/* Nueva ruta */}
            </Routes>
        </Router>
    );
};

export default App;










