import React, { useState, useEffect } from "react";
import { UserService } from "../service/user";
import FilterUsu from "../components/FilterUsu"; // Asegúrate de usar el nombre correcto
import UserTabla from "../components/UserTabla"; // Importa tu componente UserTabla

const AllUsersPage = () => {
  const [filters, setFilters] = useState({
    firstName: "",
    minAge: "",
    maxAge: "",
    role: "",
  });
  const [users, setUsers] = useState([]); // Mantén los usuarios en el estado
  const userService = new UserService();

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
    <div>
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
  );
};

export default AllUsersPage;




