import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import FlatsTable from '../components/FlatsTable';

export default function Home() {
  const [flats, setFlats] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    priceRange: { min: 0, max: 0 },
    areaRange: { min: 0, max: 0 },
  });
  const [sortField, setSortField] = useState('');
  const [user, setUser] = useState({ fullName: 'Usuario', role: 'user' }); // Mock user data

  useEffect(() => {
    fetchFlats();
  }, [filters, sortField]); 
  const fetchFlats = async () => {
    try {
      let q = collection(db, 'flats');
      // Apply filters
      if (filters.city) {
        q = query(q, where('city', '==', filters.city));
      }
      if (filters.priceRange.min > 0) {
        q = query(q, where('price', '>=', filters.priceRange.min));
      }
      if (filters.priceRange.max > 0) {
        q = query(q, where('price', '<=', filters.priceRange.max));
      }
      if (filters.areaRange.min > 0) {
        q = query(q, where('area', '>=', filters.areaRange.min));
      }
      if (filters.areaRange.max > 0) {
        q = query(q, where('area', '<=', filters.areaRange.max));
      }

      // Apply sorting
      if (sortField) {
        q = query(q, orderBy(sortField));
      }

      const querySnapshot = await getDocs(q);
      const flatsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFlats(flatsData);
    } catch (error) {
      console.error('Error fetching flats:', error);
    }
  };

  const handleToggleFavorite = async (flatId) => {
    setFlats(flats.map(flat => 
      flat.id === flatId ? { ...flat, isFavorite: !flat.isFavorite } : flat
    ));
    // TODO: Update favorite status in Firebase
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Buscar Departamentos
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
