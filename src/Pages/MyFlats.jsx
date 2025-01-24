import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Header from '../components/Header';
import FlatForm from '../components/forms/FlatForm';
import FlatsTable from '../components/FlatsTable';
import { PlusCircle, MinusCircle } from 'lucide-react';

export default function MyFlats() {
  const [flats, setFlats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user] = useState({ fullName: 'Usuario', role: 'user' }); // Mock user data

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

      const docRef = await addDoc(collection(db, 'flats'), newFlat);
      setFlats((prev) => [...prev, { ...newFlat, id: docRef.id }]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating flat:', error);
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
            <h1 className="text-3xl font-bold text-gray-900">Mis Departamentos</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {showForm ? (
                <>
                  <MinusCircle className="h-5 w-5" />
                  <span>Cancelar</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" />
                  <span>Nuevo Departamento</span>
                </>
              )}
            </button>
          </div>

          {showForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Crear Nuevo Departamento
              </h2>
              <FlatForm onSubmit={handleCreateFlat} />
            </div>
          )}

          <FlatsTable
            flats={flats}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteFlat}
          />
        </div>
      </main>
    </div>
  );
}
