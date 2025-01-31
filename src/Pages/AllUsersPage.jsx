import React, { useState, useEffect } from "react";
import { UserService } from "../service/user";
import FilterUsu from "../components/FilterUsu";
import UserTabla from "../components/UserTabla";
import Header from "../components/Header";


const AllUsersPage = () => {
  const [filters, setFilters] = useState({
    firstName: "",
    minAge: "",
    maxAge: "",
    role: "",
    sortBy: "",
  });
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ fullName: 'Usuario', isAdmin: false });
  const userService = new UserService();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (storedUser) {
      setUser({
        fullName: `${storedUser.firstName} ${storedUser.lastName}`, // Corrección aquí
        isAdmin: storedUser.isAdmin,
      });
    }
  }, []);
  

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await userService.getUsers(filters);
      setUsers(
        usersData.map((user) => ({
          ...user,
          role: user.isAdmin ? "admin" : "user",
        }))
      );
    };

    fetchUsers();
  }, [filters]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
  };

  const handleGrantAdmin = async (userId, newRole) => {
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
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-2 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-40">
            All Users
          </h1>

          <FilterUsu
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />

          <div className="overflow-y-auto max-h-[70vh] mt-4">
            <UserTabla
              users={users}
              onGrantAdmin={handleGrantAdmin}
              onDeleteUser={handleDeleteUser}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllUsersPage;




