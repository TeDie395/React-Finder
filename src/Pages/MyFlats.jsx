import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Header from '../components/Header';
import FlatForm from '../components/forms/FlatForm';
import FlatsTable from '../components/FlatsTable';
import { PlusCircle, MinusCircle } from 'lucide-react';

export default function MyFlats() {
  const [flats, setFlats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user] = useState({ fullName: 'Usuario', role: 'user' }); // Mock user data
  const [editingFlat, setEditingFlat] = useState(null); // Estado para el flat que estamos editando

  useEffect(() => {
    fetchMyFlats();
  }, []);

  const fetchMyFlats = async () => {
    try {
      const q = query(collection(db, 'flats'));
      const querySnapshot = await getDocs(q);
      const flatsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFlats(flatsData);
    } catch (error) {
      console.error('Error fetching flats:', error);
    }
  };

  const handleCreateFlat = async (flatData) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const newFlat = {
        ...flatData,
        isFavorite: false,
        owner: {
          id: currentUser.uid,
          fullName: currentUser.displayName || 'Usuario',
          email: currentUser.email || '',
        },
      };

      if (flatData.id) {
        // Si el flatData tiene un id, significa que estamos actualizando un flat existente
        const flatRef = doc(db, 'flats', flatData.id);
        await setDoc(flatRef, newFlat);
        setFlats((prev) =>
          prev.map((flat) => (flat.id === flatData.id ? { ...flat, ...newFlat } : flat))
        );
      } else {
        // Si no tiene id, significa que estamos creando un nuevo flat
        const docRef = await addDoc(collection(db, 'flats'), newFlat);
        setFlats((prev) => [...prev, { ...newFlat, id: docRef.id }]);
      }

      setShowForm(false);
      setEditingFlat(null); // Limpiar el estado de edición
    } catch (error) {
      console.error('Error creating or updating flat:', error);
    }
  };

  const handleDeleteFlat = async (flatId) => {
    try {
      await deleteDoc(doc(db, 'flats', flatId));
      setFlats((prev) => prev.filter((flat) => flat.id !== flatId));
    } catch (error) {
      console.error('Error deleting flat:', error);
    }
  };

  const handleEditFlat = (flatId) => {
    const flatToEdit = flats.find((flat) => flat.id === flatId);
    setEditingFlat(flatToEdit); // Establecemos el flat que vamos a editar en el estado
    setShowForm(true); // Mostramos el formulario para editar
  };

  const handleToggleFavorite = (flatId) => {
    setFlats(
      flats.map((flat) =>
        flat.id === flatId ? { ...flat, isFavorite: !flat.isFavorite } : flat
      )
    );
    // TODO: Update favorite status in Firebase
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Flats</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {showForm ? (
                <>
                  <MinusCircle className="h-5 w-5" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" />
                  <span>New Flat</span>
                </>
              )}
            </button>
          </div>

          {showForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingFlat ? 'Edit Flat' : 'Create New Flat'}
              </h2>
              <FlatForm onSubmit={handleCreateFlat} initialData={editingFlat} />
            </div>
          )}

          <FlatsTable
            flats={flats}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteFlat}
            onEdit={handleEditFlat}
          />
        </div>
      </main>
    </div>
  );
}
