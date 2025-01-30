export default function FilterUsu({ filters, onFilterChange, onSortChange }) {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      onFilterChange({
        ...filters,
        [name]: value,
      });
    };
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filters.firstName}
              onChange={handleInputChange}
              name="firstName"
              placeholder="Filtrar por nombre"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={filters.minAge}
                onChange={handleInputChange}
                name="minAge"
                placeholder="Mín"
              />
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={filters.maxAge}
                onChange={handleInputChange}
                name="maxAge"
                placeholder="Máx"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filters.role}
              onChange={handleInputChange}
              name="role"
            >
              <option value="">Filtrar por Rol</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Ordenar por</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            <option value="firstName">Nombre</option>
            <option value="lastName">Apellido</option>
            <option value="email">Correo</option>
          </select>
        </div>
      </div>
    );
  }

  