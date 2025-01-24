import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import ProfileUpdatePage from './Pages/ProfileUpdatePage';
import MyFlats from './Pages/MyFlats';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />  
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />  
                    <Route path="/profile/update/:userId" element={<ProfileUpdatePage />} />  
                    <Route path="/my-flats" element={<MyFlats />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;



















