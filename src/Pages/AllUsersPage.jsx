import React, { useState, useEffect } from "react";
import { UserService } from "../service/user";
import FilterUsu from "../components/FilterUsu";
import UserTabla from "../components/UserTabla";
import Header from "../components/Header"; // Asegúrate de importar Header

const AllUsersPage = () => {
  const [filters, setFilters] = useState({
    firstName: "",
    minAge: "",
    maxAge: "",
    role: "",
  });
  const [users, setUsers] = useState([]); // Mantén los usuarios en el estado
  const [user, setUser] = useState({ fullName: 'Usuario', isAdmin: false }); // Definir el estado del usuario
  const userService = new UserService();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (storedUser) {
      setUser({
        fullName: `${storedUser.firstName} ${storedUser.lastName}`, // Corrección: template literal con comillas invertidas
        isAdmin: storedUser.isAdmin,  // Usar isAdmin aquí
      });
    }
  }, []);  // Solo ejecutarse una vez al cargar
  

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await userService.getUsers(filters);
      setUsers(
        usersData.map((user) => ({
          ...user,
          role: user.isAdmin ? "admin" : "user", // Aquí asignamos el rol según isAdmin
        }))
      );
    };

    fetchUsers();
  }, [filters]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleSortChange = (sortBy) => {
    console.log("Ordenar por:", sortBy);
  };

  const handleGrantAdmin = async (userId, newRole) => {
    // Lógica para cambiar el rol entre 'admin' y 'user'
    await userService.updateUser({ isAdmin: newRole === "admin" }, userId);
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isAdmin: newRole === "admin" } : user
      )
    );
  };

  const handleDeleteUser = async (userId) => {
    await userService.deleteUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-100">  {/* Clase de fondo similar a Home */}
      <Header user={user} />  {/* Aquí se renderiza el Header con la información del usuario */}

      <main className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">  {/* Contenedor principal centrado */}
        <div className="px-4 py-2 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">  {/* Título de la página */}
            Todos los Usuarios
          </h1>

          <FilterUsu
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          
          <UserTabla
            users={users}
            onGrantAdmin={handleGrantAdmin}
            onDeleteUser={handleDeleteUser}
          />
        </div>
      </main>
    </div>
  );
};

export default AllUsersPage;




