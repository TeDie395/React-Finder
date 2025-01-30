import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export class UserService {
  constructor() {}

  async createUser(user) {
    const userCollectionRef = collection(db, "users");
    try {
      const result = await addDoc(userCollectionRef, user);
      return { data: { ...user, id: result.id }, message: 'User created successfully.' };
    } catch (error) {
      return { data: null, message: 'Error creating user' };
    }
  }

  async login(email, password) {
    const userCollectionRef = collection(db, "users");
    const setQuery = query(userCollectionRef, where("email", "==", email), where("password", "==", password));
    try {
      const resultQuery = await getDocs(setQuery);
      if (!resultQuery.empty) {
        const userResult = resultQuery.docs[0].data();
        const id = resultQuery.docs[0].id;
        return { data: { ...userResult, password: '', id: id }, message: 'User login successfully.' };
      } else {
        return { data: null, message: 'Incorrect email or password' };
      }
    } catch (error) {
      return { data: null, message: 'Incorrect email or password' };
    }
  }

  async getUser(id) {
    const userRef = doc(db, "users", id);
    const result = await getDoc(userRef);
    return { data: result.data() };
  }

  async updateUser(user, id) {
    const userRef = doc(db, "users", id);
    if (user.password === '') {
      delete user.password;
    }
    await updateDoc(userRef, user);
    return { data: { ...user, id, password: '' }, message: 'User updated successfully.' };
  }

  async getUsers(filters) {
    let queryRef = collection(db, "users");
  
    // Filtro por nombre usando firstNameLower (insensible a mayúsculas/minúsculas)
    if (filters.firstName) {
      const firstNameLower = filters.firstName.toLowerCase();  // Convierte el nombre en minúsculas
      queryRef = query(queryRef, where("firstNameLower", ">=", firstNameLower), where("firstNameLower", "<=", firstNameLower + '\uf8ff'));
    }
  
    // Filtro por edad
    if (filters.minAge) {
      queryRef = query(queryRef, where("age", ">=", parseInt(filters.minAge)));
    }
    if (filters.maxAge) {
      queryRef = query(queryRef, where("age", "<=", parseInt(filters.maxAge)));
    }
  
    // Filtro por rol
    if (filters.role) {
      queryRef = query(queryRef, where("role", "==", filters.role));
    }
  
    // Obtener los documentos de la colección con los filtros aplicados
    const snapshot = await getDocs(queryRef);
    let users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
    // Si hay filtros por nombre, hacer una búsqueda parcial en el cliente
    if (filters.firstName) {
      users = users.filter(user =>
        user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) // Comparar con la búsqueda en minúsculas
      );
    }
  
    // Ordenar los usuarios si es necesario
    if (filters.sortBy) {
      users.sort((a, b) => {
        if (a[filters.sortBy] < b[filters.sortBy]) return -1;
        if (a[filters.sortBy] > b[filters.sortBy]) return 1;
        return 0;
      });
    }
  
    return users;
  }
  
  

  async deleteUser(id) {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    return { message: 'User deleted successfully.' };
  }
}