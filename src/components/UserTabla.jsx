import { useNavigate } from "react-router-dom";

const UserTabla = ({ users = [], onGrantAdmin, onDeleteUser }) => {
  const navigate = useNavigate();

  // Acción para alternar entre Admin y User
  const handleToggleRole = (user) => {
    const updatedRole = user.isAdmin ? "user" : "admin"; // Alterna entre admin y user
    onGrantAdmin(user.id, updatedRole); // Llama a onGrantAdmin con el nuevo rol
  };

  const actionBodyTemplate = (user) => {
    return (
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            navigate("/profile/update/" + user.id);
          }}
        >
          Editar
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleToggleRole(user)} // Cambiar entre user y admin
        >
          {user.isAdmin ? "Quitar Admin" : "Conceder Admin"} {/* Cambia el texto */}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => onDeleteUser(user.id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const getRole = (isAdmin) => {
    return isAdmin ? "Admin" : "User";
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apellido
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Correo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.firstName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.lastName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{getRole(user.isAdmin)}</div>
              </td>
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
