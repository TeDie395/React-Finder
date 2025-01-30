import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Importa el AuthProvider
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import ProfileUpdatePage from './Pages/ProfileUpdatePage';
import MyFlats from './Pages/MyFlats';
import AllUsersPage from './Pages/AllUsersPage';
import Header from './components/Header'; // Asegúrate de importar Header correctamente
import FavoritesPage from './pages/FavoritesPage';
import FlatDetailPage from './pages/FlatDetailPage';

const App = () => {
    return (
        <AuthProvider>  {/* Asegúrate de envolver la app en AuthProvider */}
            <Router>
                <Header />  {/* El Header debe estar dentro del Router para funcionar */}
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/update/:userId" element={<ProfileUpdatePage />} />
                    <Route path="/my-flats" element={<MyFlats />} />
                    <Route path="/all-users" element={<AllUsersPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/flats/:flatId" element={<FlatDetailPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;





























