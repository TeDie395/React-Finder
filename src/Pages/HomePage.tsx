import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDataFromFirebase } from '../firebaseConfig'; 
import Header from '../components/Header_temp'; 
import FilterBar from '../components/FilterBar'; 
import FlatsTable from '../components/FlatsTable_temp'; 
import { FilterOptions } from '../types/FilterTypes'; 

interface User {
    firstName: string;
    lastName: string;
    role: string;
}

const HomePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    
    const [filters, setFilters] = useState<FilterOptions>({
      city: '',
      priceRange: { min: 0, max: 1000000 },  // Usar objeto con min y max
      areaRange: { min: 0, max: 10000 },     // Usar objeto con min y max
  });

    const [flats, setFlats] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    navigate('/login');
                    return;
                }

                const userDoc = await getUserDataFromFirebase(userId);
                if (userDoc) {
                    setUser({
                        firstName: userDoc.firstName,
                        lastName: userDoc.lastName,
                        role: userDoc.role,
                    });
                } else {
                    console.error('No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleFilterChange = (newFilter: FilterOptions) => {
        setFilters(newFilter);
    };

    const handleSortChange = (sortField: string) => {
        console.log('Ordenar por:', sortField);
        // Aquí puedes implementar la lógica para ordenar los resultados
    };

    const handleToggleFavorite = (flatId: string) => {
        setFavorites(prevFavorites => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(flatId)) {
                newFavorites.delete(flatId);
            } else {
                newFavorites.add(flatId);
            }
            return newFavorites;
        });
    };

    return (
      <div className="min-h-screen bg-gray-100">
        <Header user={user} />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Buscar Departamentos</h1>
            <FilterBar 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onSortChange={handleSortChange}  // Agregado aquí
            />
            <FlatsTable flats={flats} onToggleFavorite={handleToggleFavorite} />
          </div>
        </main>
      </div>
    );
};

export default HomePage;














 
  