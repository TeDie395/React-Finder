import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; 

const RegisterPage = () => {
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const birthDate = useRef();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateNames = (name) => {
        return name.length >= 2;
    };

    const validateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age >= 18 && age <= 120;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email.current.value)) {
            alert('El correo electrónico no tiene un formato válido.');
            return;
        }

        if (!validateNames(firstName.current.value) || !validateNames(lastName.current.value)) {
            alert('Los nombres deben tener al menos 2 caracteres.');
            return;
        }

        if (!validateAge(birthDate.current.value)) {
            alert('La edad debe estar entre 18 y 120 años.');
            return;
        }

        if (!validatePassword(password.current.value)) {
            alert('La contraseña debe tener al menos 6 caracteres, con letras, números y un carácter especial.');
            return;
        }

        if (password.current.value !== confirmPassword.current.value) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            );
            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                birthDate: birthDate.current.value,
            });
            alert('Registro exitoso');
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Register</h2>
                <form onSubmit={submit} className="space-y-2">
                    <div className="flex space-x-2 mb-2">
                        <div>
                            <input placeholder="First Name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" ref={firstName} />
                        </div>
                        <div>
                            <input placeholder="Last Name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" ref={lastName} />
                        </div>
                    </div>
                    <div className="mb-2">
                        <input placeholder="Email" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" ref={email} />
                    </div>
                    <div className="relative mb-2">
                        <input placeholder="Password" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="password" type={showPassword ? 'text' : 'password'} ref={password} autoComplete="new-password" />
                        <span onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <div className="relative mb-2">
                        <input placeholder="Confirm Password" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} ref={confirmPassword} autoComplete="new-password" />
                        <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            {showConfirmPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="gender" className="text-sm text-gray-200">Gender</label>
                        <select className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age" className="text-sm text-gray-200">Age</label>
                        <input className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" id="age" type="date" ref={birthDate} />
                    </div>
                    <p className="text-white text-center mb-4">
                        Already have an account? <a className="text-blue-500 hover:underline" href="#" onClick={() => navigate('/')}>Login</a>
                    </p>
                    <div className="flex justify-center">
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">Register</button>
                    </div>
                </form>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default RegisterPage;

