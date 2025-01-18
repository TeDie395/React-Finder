import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Heart, LogOut, Users, Building, Search, Trash2 } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

interface HeaderProps {
  user: { fullName: string; role: string; } | null;
}

export default function Header({ user }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Flat Finder</span>
            </Link>
          </div>
          {user && (
            <div className="flex items-center space-x-8">
              <p className="text-gray-600 ml-4">Hola, <span className="font-semibold">{user.fullName}</span></p>
              <nav className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <Search className="h-5 w-5" />
                  <span>Buscar Flats</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <User className="h-5 w-5" />
                  <span>Mi Perfil</span>
                </Link>
                <Link to="/my-flats" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <Home className="h-5 w-5" />
                  <span>Mis Flats</span>
                </Link>
                <Link to="/favorites" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <Heart className="h-5 w-5" />
                  <span>Favoritos</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/users" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                    <Users className="h-5 w-5" />
                    <span>Usuarios</span>
                  </Link>
                )}
                <button onClick={() => navigate('/delete-account')} className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                  <Trash2 className="h-5 w-5" />
                  <span>Eliminar Cuenta</span>
                </button>
                <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

