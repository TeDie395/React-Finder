// AllUsersPage.jsx
import React, { useState } from 'react';
import FilterUsu from '../components/FilterUsu';  // Asegúrate de usar el nombre correcto

const AllUsersPage = () => {
  // Puedes tener un estado de filtros y orden si es necesario
  const [filters, setFilters] = useState({
    firstName: '',
    minAge: '',
    maxAge: '',
    role: '',
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleSortChange = (sortBy) => {
    // Aquí podrías ordenar la lista de usuarios, dependiendo del criterio
    console.log('Ordenar por:', sortBy);
  };

  return (
    <div>
      <FilterUsu 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onSortChange={handleSortChange}
      />
      <h1>Lista de Usuarios</h1>
      {/* Aquí renderizarías la lista de usuarios filtrados y ordenados */}
    </div>
  );
};

export default AllUsersPage;
