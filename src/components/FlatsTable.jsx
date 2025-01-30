import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Edit2 } from 'lucide-react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { LocalStorageService } from '../service/localStorage';

export default function FlatsTable({ flats, onToggleFavorite, onDelete, onEdit, userService, user }) {
  const [isMessageFormVisible, setIsMessageFormVisible] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está en el almacenamiento local
    const localUser = new LocalStorageService().getLoggedUser();
    
    if (localUser) {
      setCurrentUser(localUser);
    } else {
      // Si no hay usuario en LocalStorage, obtener desde Firebase si es necesario
      if (user && user.id) {
        userService.getUser(user.id).then(userData => {
          setCurrentUser(userData.data);
        });
      }
    }
  }, [user, userService]);

  const senderEmail = currentUser ? currentUser.email : 'Unknown';

  const handleSendMessage = (flat) => {
    if (!flat) return;
    const message = {
      content: messageContent,
      date: new Date().toLocaleString(),
      senderEmail: senderEmail,
      flatId: flat.id,
    };
    console.log('Mensaje enviado:', message);
    
    // Mostrar la alerta de éxito
    alert('Mensaje enviado');
    
    // Limpiar el formulario y cerrar
    setIsMessageFormVisible(false);
    setMessageContent('');
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flats.map((flat) => (
            <tr key={flat.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{flat.city}</div>
                <div className="text-sm text-gray-500">
                  {flat.streetName}, {flat.streetNumber}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {flat.areaSize} m², {' '}
                  {flat.hasAC ? 'Con A/C' : 'Sin A/C'}, {' '}
                  Year Built: {flat.yearBuilt}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${flat.rentPrice}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{flat.owner.fullName}</div>
                <div className="text-sm text-gray-500">{flat.owner.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/flats/${flat.id}`} // Aquí está la corrección
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    See details
                  </Link>
                  {onToggleFavorite && (
                    <button
                      onClick={() => onToggleFavorite(flat.id)}
                      className={`p-1 rounded-full ${
                        flat.isFavorite ? 'text-red-600' : 'text-gray-400'
                      } hover:text-red-600`}
                    >
                      <Heart className="h-5 w-5" fill={flat.isFavorite ? 'currentColor' : 'none'} />
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(flat.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(flat.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-blue-600"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  )}

                  {/* Agregar icono de mensaje */}
                  <button
                    onClick={() => {
                      setSelectedFlat(flat);
                      setIsMessageFormVisible(true);
                    }}
                    className="p-1 rounded-full text-gray-400 hover:text-blue-600"
                  >
                    <EnvelopeIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de mensaje */}
      {isMessageFormVisible && selectedFlat && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Send Message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(selectedFlat);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  value={new Date().toLocaleString()}
                  disabled
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Message Content</label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows="4"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sender Email</label>
                <input
                  type="text"
                  value={senderEmail}
                  disabled
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Send Message
              </button>
              <button
                type="button"
                onClick={() => setIsMessageFormVisible(false)}
                className="mt-4 w-full bg-gray-300 py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

