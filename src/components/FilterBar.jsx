import React from 'react';
import Header from './Header';

export default function FilterBar({ filters, onFilterChange, onSortChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={filters.city}
            onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
            placeholder="Filter by city"
          />  
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filters.priceRange.max}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  priceRange: { ...filters.priceRange, max: Number(e.target.value) },
                })
              }
              placeholder="Máx"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Area Range (m²)</label>
          <div className="grid grid-cols-2 gap-2">
            
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filters.areaRange.max}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  areaRange: { ...filters.areaRange, max: Number(e.target.value) },
                })
              }
              placeholder="Máx"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sort by</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Select</option>
          <option value="city">City</option>
          <option value="price">Price</option>
          <option value="area">Área</option>
        </select>
      </div>
    </div>
  );
}
