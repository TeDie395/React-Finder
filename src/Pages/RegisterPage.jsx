import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const birthDateRef = useRef();
    const genderRef = useRef();

    const validate = {
        password: (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password),
        email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        name: (name) => name.length >= 2,
        age: (birthDate) => {
            const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
            return age >= 18 && age <= 120;
        }
    };

    const togglePasswordVisibility = (type) => {
        if (type === 'password') {
            setShowPassword((prev) => !prev);
        } else if (type === 'confirmPassword') {
            setShowConfirmPassword((prev) => !prev);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            birthDate: birthDateRef.current.value,
            gender: genderRef.current.value
        };

        if (!validate.email(values.email)) return setErrorMessage('El correo electrónico no tiene un formato válido.');
        if (!validate.name(values.firstName) || !validate.name(values.lastName)) return setErrorMessage('Los nombres deben tener al menos 2 caracteres.');
        if (!validate.age(values.birthDate)) return setErrorMessage('La edad debe estar entre 18 y 120 años.');
        if (!validate.password(values.password)) return setErrorMessage('La contraseña debe cumplir con los requisitos.');
        if (values.password !== values.confirmPassword) return setErrorMessage('Las contraseñas no son iguales.');

        try {
            
            const userId = uuidv4(); 

            const userRef = doc(db, 'users', userId); 
            await setDoc(userRef, {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                birthDate: values.birthDate,
                gender: values.gender,
                password: values.password, 
            });

            navigate('/login');
            alert('Registro exitoso');
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <InputField label="First Name" ref={firstNameRef} />
                        <InputField label="Last Name" ref={lastNameRef} />
                    </div>
                    <InputField label="Email" type="email" ref={emailRef} />
                    <PasswordField label="Password" ref={passwordRef} showPassword={showPassword} toggleVisibility={() => togglePasswordVisibility('password')} />
                    <PasswordField label="Confirm Password" ref={confirmPasswordRef} showPassword={showConfirmPassword} toggleVisibility={() => togglePasswordVisibility('confirmPassword')} />
                    <SelectField label="Gender" ref={genderRef} />
                    <InputField label="Birth Date" type="date" ref={birthDateRef} />

                    <div className="flex justify-center">
                        <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-indigo-600 transition ease-in-out duration-150">
                            Register
                        </button>
                    </div>
                </form>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>
        </div>
    );
};

const InputField = React.forwardRef(({ label, type = 'text' }, ref) => (
    <div className="mb-2">
        <input
            placeholder={label}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type={type}
            ref={ref}
        />
    </div>
));

const PasswordField = React.forwardRef(({ label, showPassword, toggleVisibility }, ref) => (
    <div className="relative mb-2">
        <input
            placeholder={label}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type={showPassword ? 'text' : 'password'}
            ref={ref}
        />
        <span onClick={toggleVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {showPassword ? '🙈' : '👁️'}
        </span>
    </div>
));

const SelectField = React.forwardRef(({ label }, ref) => (
    <div className="mb-2">
        <label htmlFor={label} className="text-sm text-gray-200">{label}</label>
        <select
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            ref={ref}
        >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
    </div>
));

export default RegisterPage;
