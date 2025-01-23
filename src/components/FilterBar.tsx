import React from 'react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sortField: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onSortChange }) => {
  // Cambiar la ciudad
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, city: e.target.value });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: { min, max } }); // Usar objeto con min y max
};

const handleAreaRangeChange = (min: number, max: number) => {
    onFilterChange({ ...filters, areaRange: { min, max } }); // Usar objeto con min y max
};


  // Cambiar el campo de orden
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4 w-full max-w-5xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-200">Ciudad:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={filters.city}
            onChange={handleCityChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-200">Precio Mínimo:</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.priceRange.min} // Usar .min del objeto
            onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange.max)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-200">Precio Máximo:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.priceRange.max} // Usar .max del objeto
            onChange={(e) => handlePriceRangeChange(filters.priceRange.min, Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="minArea" className="block text-sm font-medium text-gray-200">Área Mínima:</label>
          <input
            type="number"
            id="minArea"
            name="minArea"
            value={filters.areaRange.min} // Usar .min del objeto
            onChange={(e) => handleAreaRangeChange(Number(e.target.value), filters.areaRange.max)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="maxArea" className="block text-sm font-medium text-gray-200">Área Máxima:</label>
          <input
            type="number"
            id="maxArea"
            name="maxArea"
            value={filters.areaRange.max} // Usar .max del objeto
            onChange={(e) => handleAreaRangeChange(filters.areaRange.min, Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="sortField" className="block text-sm font-medium text-gray-200">Ordenar por:</label>
          <select id="sortField" name="sortField" onChange={handleSortChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-gray-200">
            <option value="">Seleccione</option>
            <option value="price">Precio</option>
            <option value="area">Área</option>
            <option value="bedrooms">Habitaciones</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;





