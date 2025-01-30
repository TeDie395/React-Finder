import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de que useNavigate está aquí
import { Home, User, Heart, LogOut, Users, Building, Search, Trash2 } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Leemos el usuario del localStorage cuando se monta el Header
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("Usuario desde localStorage:", storedUser); // Verifica si el usuario se obtiene correctamente

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);  // Solo se ejecuta una vez al montar el componente

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
  if (!user) return null; // Puedes agregar un loading aquí si lo prefieres.

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button onClick={handleLogoClick} className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Flat Finder</span>
            </button>
          </div>

          <div className="flex items-center space-x-8">
            <p className="text-gray-600">
              Hello, <span className="font-semibold">{user.firstName} {user.lastName}</span>
            </p>
            
            <nav className="flex items-center space-x-4">
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

              {/* Verificar si el usuario tiene isAdmin como true */}
              {user.isAdmin && (
                <>
                  <Link to="/all-users" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                    <Users className="h-5 w-5" />
                    <span>All Users</span>
                  </Link>
                </>
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
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}




