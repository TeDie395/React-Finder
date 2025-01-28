import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'; 
import { PlusSquare } from 'lucide-react';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Importa la configuración de Firebase

export default function FlatForm({ initialData, buttonText = 'Save' }) {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    initialData ?? {
      city: '',
      streetName: '',
      streetNumber: 0,
      areaSize: 0,
      hasAC: false,
      yearBuilt: 2010,
      rentPrice: 0,
      dateAvailable: '',
      owner: {
        id: '',
        email: '',
        fullName: '',
      },
    }
  );
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = async (e) => {   
    e.preventDefault();

    try {
      const dataToSave = {
        ...formData,
        owner: {
          id: user.userId, // Usamos el UID del usuario logeado
          email: user.email, // Email del usuario logeado
          fullName: `${user.firstName} ${user.lastName}`,
        },
      };

      if (initialData && initialData.id) {
        // Si estamos editando un flat existente, usamos setDoc para actualizar
        const flatRef = doc(db, 'flats', initialData.id);
        await setDoc(flatRef, dataToSave);
        alert('Departamento actualizado exitosamente');
      } else {
        // Si es un nuevo flat, usamos addDoc para crear
        await addDoc(collection(db, 'flats'), dataToSave);
        alert('Departamento guardado exitosamente');
      }

      navigate('/home');
      
      // Resetear el formulario después de guardar
      setFormData({
        city: '',
        streetName: '',
        streetNumber: 0,
        areaSize: 0,
        hasAC: false,
        yearBuilt: 2010,
        rentPrice: 0,
        dateAvailable: '',
        owner: {
          id: '',
          email: '',
          fullName: '',
        },
      });

    } catch (error) {
      console.error('Error al guardar el departamento:', error);
      alert('Hubo un error al guardar el departamento. Inténtalo de nuevo.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    const newValue = type === 'checkbox' ? checked : value;
  
    setFormData((prev) =>
      name in prev.owner
        ? {
            ...prev,
            owner: {
              ...prev.owner,
              [name]: newValue,
            },
          }
        : {
            ...prev,
            [name]:
              name === 'streetNumber' || name === 'areaSize' || name === 'yearBuilt' || name === 'rentPrice'
                ? Number(newValue)
                : name === 'hasAC'
                ? Boolean(newValue)
                : newValue,
          }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Campos del formulario */}
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Name</label>
          <input
            type="text"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Number</label>
          <input
            type="number"
            name="streetNumber"
            value={formData.streetNumber}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Area Size (m²)</label>
          <input
            type="number"
            name="areaSize"
            value={formData.areaSize}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Has AC</label>
          <input
            type="checkbox"
            name="hasAC"
            checked={formData.hasAC}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Year Built</label>
          <input
            type="number"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            required
            min="2010"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rent Price (USD)</label>
          <input
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Available</label>
          <input
            type="date"
            name="dateAvailable"
            value={formData.dateAvailable}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusSquare className="h-5 w-5" />
          <span>{initialData ? 'Update Flat' : 'Save Flat'}</span>
        </button>
      </div>
    </form>
  );
}
