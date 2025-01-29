import React, { useState, useEffect } from 'react';
import { db } from '../firebaseconfig'; 
import { collection, getDocs, query, where, orderBy, doc, updateDoc } from 'firebase/firestore'; // Importa query, where, orderBy
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import FlatsTable from '../components/FlatsTable';


export default function Home() {
  const [flats, setFlats] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    priceRange: { max: 0 },
    areaRange: { max: 0 },
  });
  const [sortField, setSortField] = useState('');
  const [user, setUser] = useState({ fullName: 'Usuario', isAdmin: false });

  // Obtener información del usuario desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (storedUser) {
      setUser({
        fullName: `${storedUser.firstName} ${storedUser.lastName}`,
        isAdmin: storedUser.isAdmin,  // Usar isAdmin aquí
      });
    }
  }, []);  // Solo ejecutarse una vez al cargar

  // Llamar a la función para obtener los datos al cambiar los filtros o el campo de ordenación
  useEffect(() => {
    fetchFlats();
  }, [filters, sortField]);

  const fetchFlats = async () => {
    try {
      let q = query(collection(db, 'flats'));  // Aquí estás utilizando `query` correctamente

      // Aplicar filtros
      if (filters.city) {
        q = query(q, where('city', '>=', filters.city));
      }
      if (filters.priceRange.max > 0) {
        q = query(q, where('rentPrice', '<=', filters.priceRange.max));
      }
      if (filters.areaRange.max > 0) {
        q = query(q, where('area', '<=', filters.areaRange.max));
      }

      // Ordenar por el campo seleccionado
      if (sortField) {
        q = query(q, orderBy(sortField)); // Si hay un campo de ordenación, se aplica
      }

      const querySnapshot = await getDocs(q); // Ejecutar la consulta y obtener los documentos
      const flatsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFlats(flatsData); // Actualizar el estado con los departamentos obtenidos
    } catch (error) {
      console.error('Error fetching flats:', error); // Manejo de errores
    }
  };


  const handleToggleFavorite = async (flatId) => {
    try {
      // Primero, actualizar el estado local (como lo tienes ya)
      const updatedFlats = flats.map((flat) =>
        flat.id === flatId ? { ...flat, isFavorite: !flat.isFavorite } : flat
      );
      setFlats(updatedFlats);
  
      // Obtener el flat actualizado (el nuevo valor de isFavorite)
      const flatToUpdate = updatedFlats.find((flat) => flat.id === flatId);
      
      if (!flatToUpdate) return; // Si no encontramos el flat, no hacemos nada
  
      // Actualizar el documento en Firebase
      const flatRef = doc(db, 'flats', flatId); // Referencia al flat en Firestore
      await updateDoc(flatRef, { isFavorite: flatToUpdate.isFavorite });
  
      console.log('Favorite status updated in Firestore!');
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Search Flats
          </h1>
          
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onSortChange={setSortField}
          />
          
          <FlatsTable
            flats={flats}
            onToggleFavorite={handleToggleFavorite}  
          />
        </div>
      </main>
    </div>
  );
}


