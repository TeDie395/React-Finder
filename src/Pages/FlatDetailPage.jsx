import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID de la URL
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Tu configuración de Firebase

export default function FlatDetailPage() {
  const { flatId } = useParams(); // Obtener el ID del flat desde la URL
  const [flat, setFlat] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para el índice de la imagen actual

  useEffect(() => {
    const fetchFlatDetails = async () => {
      try {
        // Obtener el documento del flat usando el ID
        const flatDoc = await getDoc(doc(db, 'flats', flatId));

        if (flatDoc.exists()) {
          setFlat({ id: flatDoc.id, ...flatDoc.data() });
        } else {
          console.error('Flat not found');
        }
      } catch (error) {
        console.error('Error fetching flat details:', error);
      }
    };

    fetchFlatDetails();
  }, [flatId]); // Se vuelve a ejecutar si el flatId cambia

  // Cambiar la imagen a la siguiente
  const nextImage = () => {
    if (flat && flat.imageUrls) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % flat.imageUrls.length);
    }
  };

  // Cambiar la imagen a la anterior
  const prevImage = () => {
    if (flat && flat.imageUrls) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + flat.imageUrls.length) % flat.imageUrls.length);
    }
  };

  if (!flat) {
    return <div>Loading...</div>; // Mostrar un mensaje mientras se cargan los detalles
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{flat.city}, {flat.streetName}</h1>
      <div className="mt-4">
        {/* Carrusel de imágenes */}
        {flat.imageUrls && flat.imageUrls.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {flat.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Flat image ${index + 1}`}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Controles de navegación del carrusel */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
              <button
                onClick={prevImage}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                Prev
              </button>
              <button
                onClick={nextImage}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No images available</p>
        )}

        {/* Detalles del flat */}
        <div className="mt-4 space-y-2">
          <p><strong>Street Number:</strong> {flat.streetNumber}</p>
          <p><strong>Area Size:</strong> {flat.areaSize} m²</p>
          <p><strong>Year Built:</strong> {flat.yearBuilt}</p>
          <p><strong>Rent Price:</strong> ${flat.rentPrice}</p>
          <p><strong>Available Date:</strong> {flat.dateAvailable}</p>
          <p><strong>Has AC:</strong> {flat.hasAC ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
