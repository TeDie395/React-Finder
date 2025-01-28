import React, { useEffect, useState } from 'react';
import { db } from '../firebaseconfig'; // Asegúrate de tener correctamente la configuración de Firebase
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'; // Importa funciones necesarias
import FlatsTable from '../components/FlatsTable';  // Usamos el componente que ya tienes para mostrar los flats
import Header from '../components/Header';  // Encabezado de la página (puedes personalizarlo)

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);  // Estado para almacenar los flats favoritos
  const [user, setUser] = useState({ fullName: 'Usuario', isAdmin: false });  // Estado para la información del usuario

  // Cuando se carga la página, obtenemos los favoritos desde Firebase
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));  // Obtener el usuario desde el localStorage (suponiendo que ya tienes ese proceso)
    
    if (storedUser) {
      setUser({
        fullName: `${storedUser.firstName} ${storedUser.lastName}`,
        isAdmin: storedUser.isAdmin,  // Si el usuario es admin, puedes usarlo más adelante si lo deseas
      });

      // Llamamos a la función para obtener los favoritos
      fetchFavorites(storedUser.userId);  // Asumiendo que `userId` es único para cada usuario
    }
  }, []);

  // Función para recuperar los favoritos del usuario desde Firebase
  const fetchFavorites = async (userId) => {
    try {
      // Obtén todos los IDs de los flats favoritos del usuario
      const favoritesQuery = query(collection(db, 'users', userId, 'favorites')); // Accedemos a la subcolección 'favorites'
      const querySnapshot = await getDocs(favoritesQuery);

      // Crear un arreglo con los IDs de los flats favoritos
      const favoriteFlats = [];
      querySnapshot.forEach((doc) => {
        favoriteFlats.push(doc.id); // Aquí almacenamos el ID de cada flat en el que el usuario ha marcado como favorito
      });

      // Ahora, obtenemos los detalles de cada flat favorito usando los IDs
      const flatsData = await Promise.all(
        favoriteFlats.map(async (flatId) => {
          const flatDoc = await getDoc(doc(db, 'flats', flatId));  // Obtenemos cada flat desde la colección 'flats'
          return { id: flatDoc.id, ...flatDoc.data() };  // Devolvemos los datos completos del flat
        })
      );

      setFavorites(flatsData);  // Actualizamos el estado con la información de los flats favoritos
    } catch (error) {
      console.error('Error fetching favorites:', error);  // Manejo de errores
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />  {/* El header muestra la información del usuario */}
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Mis Favoritos</h1>
          
          {favorites.length === 0 ? (
            <p>No tienes departamentos favoritos.</p> // Si no hay favoritos, muestra este mensaje
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
