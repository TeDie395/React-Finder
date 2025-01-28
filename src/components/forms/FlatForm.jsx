import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'; 
import { PlusSquare } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Importa la configuración de Firebase



export default function FlatForm({ initialData, buttonText = 'Crear Flat' }) {
  
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(
    initialData ?? {
      city: '',
      streetName: '',
      streetNumber: 0,
      areaSize: 0,
      hasAC: false,
      yearBuilt: 1900,
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
      // Preparar datos con el owner
      const dataToSave = {
        ...formData,
        owner: {
          id: user.userId, // Usamos el UID del usuario logeado
          email: user.email, // Email del usuario logeado
          fullName: `${user.firstName} ${user.lastName}`,
        },
      };

      // Agregar documento a Firestore
      await addDoc(collection(db, 'flats'), dataToSave);
      alert('Departamento guardado exitosamente');
      navigate('/home')
      // Resetear el formulario
      setFormData({
        city: '',
        streetName: '',
        streetNumber: 0,
        areaSize: 0,
        hasAC: false,
        yearBuilt: 1900,
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
  
    // Si el campo es un checkbox, manejamos el valor booleano
    const newValue = type === 'checkbox' ? checked : value;
  
    setFormData((prev) =>
      // Si el campo pertenece al 'owner', lo manejamos por separado
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
              // Si es un campo numérico, lo convertimos a un número
              name === 'streetNumber' || name === 'areaSize' || name === 'yearBuilt' || name === 'rentPrice'
                ? Number(newValue)
                : // Si es un campo de tipo 'checkbox', lo dejamos como un valor booleano
                name === 'hasAC'
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
        min="1900"
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
      <span>{buttonText}</span>
    </button>
  </div>
</form>

  );
}
