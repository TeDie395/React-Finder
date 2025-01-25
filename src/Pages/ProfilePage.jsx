import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';
import { Building } from 'lucide-react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        gender: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedUser');
        
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData); 
            console.log("User stored in localStorage:", userData);
            fetchProfileData(userData.userId);
        } else {
            console.log("No user found in localStorage");
        }
    }, []);  

    const fetchProfileData = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("Datos del perfil obtenidos de Firestore:", userData);
                setProfileData(userData);
            } else {
                console.log("No existe el documento en Firestore con el userId:", userId);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/profile/update/${user.userId}`);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-4">
                <div className="relative mx-4 mb-4 mt-4 flex justify-center">
                    <Building className="h-16 w-auto text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4 text-center">Profile Data</h3>
                {user ? (
                    <div className="flex flex-col bg-gray-700 w-full rounded-md py-4 px-6 border border-gray-600">
                        <div className="text-base font-semibold text-gray-200">
                            <p className="mb-2"><strong>Email:</strong> {profileData.email || 'N/A'}</p>
                            <p className="mb-2"><strong>First Name:</strong> {profileData.firstName || 'N/A'}</p>
                            <p className="mb-2"><strong>Last Name:</strong> {profileData.lastName || 'N/A'}</p>
                            <p className="mb-2"><strong>Birth Date:</strong> {profileData.birthDate || 'N/A'}</p>
                            <p className="mb-2"><strong>Gender:</strong> {profileData.gender ? profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1) : 'N/A'}</p> {/* Primer letra en mayúscula */}
                            <p className="mb-2"><strong>Password:</strong> 
                                <span className="flex items-center">
                                    <input 
                                        type={showPassword ? 'text' : 'password'} // Cambiar el tipo según el estado
                                        value={profileData.password || 'N/A'} 
                                        readOnly 
                                        className="bg-transparent text-gray-200 border-none"
                                    />
                                    <span 
                                        onClick={togglePasswordVisibility} 
                                        className="cursor-pointer ml-2"
                                        title={showPassword ? "Hide Password" : "Show Password"}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </span>
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-around items-center py-3">
                            <div className="flex gap-2 text-gray-200 hover:scale-110 duration-200 hover:cursor-pointer">
                                <svg className="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                <button className="font-semibold text-sm text-green-700" onClick={handleEdit}>Edit</button>
                            </div>
                            <button
                                className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                                title="Go Back"
                                onClick={handleGoHome}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="stroke-blue-300">
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-500">No user logged in</div> 
                )}
            </div>
        </div>
    );
};

export default ProfilePage;




















    


















    







