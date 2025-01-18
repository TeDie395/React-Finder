import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { Flat } from '../types';

interface FlatsTableProps {
  flats: Flat[];
  onToggleFavorite: (flatId: string) => void;
  onDelete?: (flatId: string) => void;
}

export default function FlatsTable({ flats, onToggleFavorite, onDelete }: FlatsTableProps) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Propiedad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ubicación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Detalles
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Propietario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flats.map((flat) => (
            <tr key={flat.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{flat.title}</div>
                    <div className="text-sm text-gray-500">{flat.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{flat.city}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {flat.area} m² • {flat.bedrooms} hab • {flat.bathrooms} baños
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${flat.price.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{flat.owner.fullName}</div>
                <div className="text-sm text-gray-500">{flat.owner.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/flats/${flat.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Ver detalles
                  </Link>
                  <button
                    onClick={() => onToggleFavorite(flat.id)}
                    className={`p-1 rounded-full ${
                      flat.isFavorite ? 'text-red-600' : 'text-gray-400'
                    } hover:text-red-600`}
                  >
                    <Heart className="h-5 w-5" fill={flat.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(flat.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
