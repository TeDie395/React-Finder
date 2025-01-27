import { useEffect, useState } from "react";
import { UserService } from "../../services/user/user.js";
import { Button, Column, DataTable, InputText, Dropdown } from "../../services/prime/primeComponents.js";
import { useNavigate } from "react-router-dom";

export const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    firstName: null,
    minAge: null,
    maxAge: null,
    role: false,
  });

  const roles = [
    { name: 'All Users', code: '' },
    { name: 'Admin', code: 'admin' },
    { name: 'User', code: 'user' }
  ];

  const navigate = useNavigate();
  const userService = new UserService();

  const getUsers = async () => {
    setLoading(true);
    const result = await userService.getUsers(filters);
    setUsers(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [filters]);

  const actionBodyTemplate = (user) => {
    return (
      <Button type="button" icon="pi pi-pencil" rounded onClick={() => { navigate('/profile/update/' + user.id); }} />
    );
  };

  const firstNameFilterTemplate = () => {
    return (
      <InputText
        placeholder={'First Name'}
        value={filters.firstName}
        onChange={(e) => setFilters({ ...filters, firstName: e.target.value })}
      />
    );
  };

  const roleFilterTemplate = () => {
    return (
      <Dropdown
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.value })}
        options={roles}
        optionLabel="name"
        placeholder="Select a Role"
        className="w-full md:w-14rem"
      />
    );
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-4">
                  {actionBodyTemplate(user)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

  