import { useEffect, useState } from "react";
import { UserService } from '../service/user';
import { useNavigate } from "react-router-dom";

const UserTabla = ({ users = [], onGrantAdmin, onDeleteUser }) => {
  const [loading, setLoading] = useState(false);
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
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => { navigate('/profile/update/' + user.id); }}>Editar</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => onGrantAdmin(user.id)}>Conceder Admin</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onDeleteUser(user.id)}>Eliminar</button>
      </div>
    );
  };

  const firstNameFilterTemplate = () => {
    return (
      <input
        type="text"
        placeholder="First Name"
        value={filters.firstName}
        onChange={(e) => setFilters({ ...filters, firstName: e.target.value })}
        className="border p-2 rounded"
      />
    );
  };

  const roleFilterTemplate = () => {
    return (
      <select
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        className="border p-2 rounded"
      >
        {roles.map(role => (
          <option key={role.code} value={role.code}>{role.name}</option>
        ))}
      </select>
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
                {actionBodyTemplate(user)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTabla;
  