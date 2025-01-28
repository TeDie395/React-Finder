import React, { useState, useEffect } from 'react';
import { UserService } from '../service/user';
import FilterUsu from '../components/FilterUsu';  // Asegúrate de usar el nombre correcto
import UserTabla from '../components/UserTabla'; // Importa tu componente UserTabla

const AllUsersPage = () => {
  const [filters, setFilters] = useState({
    firstName: '',
    minAge: '',
    maxAge: '',
    role: '',
  });
  const [users, setUsers] = useState([]);
  const userService = new UserService();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await userService.getUsers(filters);
      setUsers(usersData.filter(user => user.role !== 'admin')); // Filtrar el usuario admin
    };

    fetchUsers();
  }, [filters]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleSortChange = (sortBy) => {
    // Aquí podrías ordenar la lista de usuarios, dependiendo del criterio
    console.log('Ordenar por:', sortBy);
  };

  const handleGrantAdmin = async (userId) => {
    // Lógica para conceder permisos de admin
    await userService.updateUser({ role: 'admin' }, userId);
    setUsers(users.map(user => user.id === userId ? { ...user, role: 'admin' } : user));
  };

  const handleDeleteUser = async (userId) => {
    // Lógica para eliminar usuario
    await userService.deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <FilterUsu 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onSortChange={handleSortChange}
      />
      <h1>Lista de Usuarios</h1>
      <UserTabla 
        users={users} 
        onGrantAdmin={handleGrantAdmin} 
        onDeleteUser={handleDeleteUser} 
      />
    </div>
  );
};

export default AllUsersPage;
