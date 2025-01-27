import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';  // Asegúrate de importar AuthProvider
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Envuelve tu aplicación con el AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);


