import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Asegúrate de tener correctamente la configuración de Firebase
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'; // Importa funciones necesarias
import FlatsTable from '../components/FlatsTable';  // Usamos el componente que ya tienes para mostrar los flats
import Header from '../components/Header';  // Encabezado de la página (puedes personalizarlo)

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);  // Estado para almacenar los flats favoritos
  const [user, setUser] = useState({ fullName: 'Usuario', isAdmin: false });  // Estado para la información del usuario

  // Cuando se carga la página, obtenemos los favoritos desde Firebase
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));  // Obtener el usuario desde el localStorage (suponiendo que ya tienes ese proceso)
    
    if (storedUser && storedUser.userId) {
      setUser({
        fullName: `${storedUser.firstName} ${storedUser.lastName}`,
        isAdmin: storedUser.isAdmin,  // Si el usuario es admin, puedes usarlo más adelante si lo deseas
      });

      // Llamamos a la función para obtener los favoritos
      fetchFavorites(storedUser.userId);  // Asumiendo que `userId` es único para cada usuario
    } else {
      console.error('Usuario no autenticado o no tiene userId.');
    }
  }, []);

  // Función para recuperar los favoritos del usuario desde Firebase
  const fetchFavorites = async (userId) => {
    try {
      // Obtener todos los flats donde isFavorite es verdadero
      const flatsQuery = query(
        collection(db, 'flats'),
        where('owner.id', '==', userId), // Filtrar por el ID del propietario (si es necesario)
        where('isFavorite', '==', true)  // Filtramos por flats que son favoritos
      );
      
      const querySnapshot = await getDocs(flatsQuery);

      // Mapear los documentos a un array de datos de los flats
      const favoriteFlats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),  // Obtener todos los datos del flat
      }));

      setFavorites(favoriteFlats);  // Actualizamos el estado con los flats favoritos
    } catch (error) {
      console.error('Error fetching favorites:', error);  // Manejo de errores
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />  {/* El header muestra la información del usuario */}
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Favorites</h1>
          
          {favorites.length === 0 ? (
            <p>You don't have any favorite Flats</p> // Si no hay favoritos, muestra este mensaje
          ) : (
            <FlatsTable
              flats={favorites} // Pasamos los flats favoritos al componente FlatsTable
              onToggleFavorite={() => {}} // No necesitamos toggle aquí, ya están en favoritos
            />
          )}
        </div>
      </main>
    </div>
  );
}
