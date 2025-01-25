import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Building } from 'lucide-react'; 

const ProfileUpdatePage = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        gender: '',
        password: '',  // This will be used if the user wants to update the password
    });
    const [originalProfileData, setOriginalProfileData] = useState({});
    const [showPassword, setShowPassword] = useState(false);  // To toggle password visibility
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setProfileData(userData);
                setOriginalProfileData(userData);  // Save the original data for comparison
            }
        };
        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    // Function to check if at least one field has changed
    const isProfileChanged = () => {
        return (
            profileData.firstName !== originalProfileData.firstName ||
            profileData.lastName !== originalProfileData.lastName ||
            profileData.email !== originalProfileData.email ||
            profileData.birthDate !== originalProfileData.birthDate ||
            profileData.gender !== originalProfileData.gender ||
            profileData.password !== originalProfileData.password  // Compare password if modified
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isProfileChanged()) {
            alert('No changes detected. Please update at least one field.');
            return;
        }

        await updateDoc(doc(db, 'users', userId), {
            ...profileData,
        });

        alert('Perfil actualizado con éxito');
        navigate('/profile');
    };

    const handleGoHome = () => {
        navigate(`/home`);
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const mensaje = "¡Hola, mundo!";
    console.log("mensaje");

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-4">
                <div className="relative mx-4 mb-4 mt-4 flex justify-center">
                    <Building className="h-16 w-auto text-white" /> {/* Ajusta el tamaño del logo aquí */}
                </div>
                <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="flex space-x-2 mb-2">
                        <div>
                            <input
                                placeholder="First Name"
                                id="firstName"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleChange}
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Last Name"
                                id="lastName"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleChange}
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <input
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            placeholder="Birth Date"
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            value={profileData.birthDate}
                            onChange={handleChange}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            placeholder="Gender"
                            id="gender"
                            name="gender"
                            value={profileData.gender}
                            onChange={handleChange}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            autoComplete="off"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-2 relative">
                        <input
                            placeholder="New Password (if you want to change it)"
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}  // Toggle password visibility
                            value={profileData.password}
                            onChange={handleChange}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">
                            Update Profile
                        </button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
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
        </div>
    );
    
}

export default ProfileUpdatePage;




    
 
    






    











   






