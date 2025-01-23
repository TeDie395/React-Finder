import React from 'react';
import { PlusSquare } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Importa la configuración de Firebase

export default function FlatForm({ initialData, buttonText = 'Crear Flat' }) {
  const [formData, setFormData] = React.useState(
    initialData ?? {
      title: '',
      description: '',
      city: '',
      price: 0,
      area: 0,
      bedrooms: 1,
      bathrooms: 1,
      imageUrl: '',
      owner: {
        id: '',
        email: '',
        fullName: '',
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Preparar datos con el owner
      const dataToSave = {
        ...formData,
        owner: {
          id: '1', // Puedes obtener estos valores dinámicamente según tu lógica
          email: 'ana.garcia@email.com',
          fullName: 'Ana García',
        },
      };

      // Agregar documento a Firestore
      await addDoc(collection(db, 'flats'), dataToSave);
      alert('Departamento guardado exitosamente');

      // Resetear el formulario
      setFormData({
        title: '',
        description: '',
        city: '',
        price: 0,
        area: 0,
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: '',
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
    const { name, value } = e.target;
    setFormData((prev) =>
      name in prev.owner
        ? {
            ...prev,
            owner: {
              ...prev.owner,
              [name]: value,
            },
          }
        : {
            ...prev,
            [name]:
              name === 'price' || name === 'area' || name === 'bedrooms' || name === 'bathrooms'
                ? Number(value)
                : value,
          }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Campos del formulario */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
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
          <label className="block text-sm font-medium text-gray-700">Precio (USD)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Área (m²)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Habitaciones</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Baños</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
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
