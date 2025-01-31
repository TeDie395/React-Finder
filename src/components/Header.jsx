import React, { useEffect, useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Heart, LogOut, Users, Building, Search, Trash2, Menu, X } from 'lucide-react';
import './Resp.css';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para manejar el estado del menú hamburguesa

  // Leemos el usuario del localStorage cuando se monta el Header
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    navigate('/login'); 
  };

  const handleProfileClick = () => {
    navigate('/profile'); 
  };

  const handleLogoClick = () => {
    navigate('/home'); 
  };

  // Si no hay usuario logueado, mostramos solo el header sin opciones de usuario
  if (!user) return null;

  return (
    <header className="header-bg shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y nombre de la página */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
            <Building className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-semibold text-black">Flat Finder</span>
          </div>

          {/* Menú en dispositivos grandes */}
          <div className="hidden md:flex items-center space-x-8">
            <p className="text-black text-sm">
              Hello, <span className="font-semibold">{user.firstName} {user.lastName}</span>
            </p>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-1 text-black hover:text-indigo-600">
                <Search className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <button onClick={handleProfileClick} className="flex items-center space-x-1 text-black hover:text-indigo-600">
                <User className="h-5 w-5" />
                <span>My Profile</span>
              </button>

              <Link to="/my-flats" className="flex items-center space-x-1 text-black hover:text-indigo-600">
                <Home className="h-5 w-5" />
                <span>My Flats</span>
              </Link>
              
              <Link to="/favorites" className="flex items-center space-x-1 text-black hover:text-indigo-600">
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>

              {/* Verificar si el usuario es Admin */}
              {user.isAdmin && (
                <Link to="/all-users" className="flex items-center space-x-1 text-black hover:text-indigo-600">
                  <Users className="h-5 w-5" />
                  <span>All Users</span>
                </Link>
              )}

              <button
                onClick={() => navigate('/delete-account')}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete Account</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-black hover:text-indigo-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Botón de hamburguesa en dispositivos móviles */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-indigo-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en dispositivos móviles */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <Search className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <button onClick={handleProfileClick} className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </button>

            <Link to="/my-flats" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <Home className="h-5 w-5" />
              <span>My Flats</span>
            </Link>

            <Link to="/favorites" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>

            {user.isAdmin && (
              <Link to="/all-users" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                <Users className="h-5 w-5" />
                <span>All Users</span>
              </Link>
            )}

            <button
              onClick={() => navigate('/delete-account')}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete Account</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
