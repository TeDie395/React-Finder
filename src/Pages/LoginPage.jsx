import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building } from 'lucide-react';
import { UserService } from '../service/user';
import { LocalStorageService } from '../service/localStorage';


const LoginPage = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleValidation = (email, password) => {
        if (!email || !password) {
            setError('Por favor, ingrese un email y una contraseña.');
            return false;
        }
        return true;
    };

    const handleLogin = async (email, password) => {
        const userService = new UserService();
        try {
            const result = await userService.login(email, password);
    
            if (result && result.data) {
                console.log("Respuesta del servidor:", result.data); // Asegúrate de que 'isAdmin' es true
    
                // Crear el objeto con los datos del usuario, incluyendo 'isAdmin'
                const userData = {
                    userId: result.data.id,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    email: result.data.email,
                    role: result.data.role,
                    isAdmin: result.data.isAdmin, // Aquí debería ser true si el servidor responde correctamente
                };                
    
                console.log("Guardando en localStorage con isAdmin:", userData.isAdmin); // Verifica el valor aquí
    
                // Elimina cualquier usuario previamente guardado en localStorage
                localStorage.removeItem('loggedUser'); 
    
                // Ahora guardamos los datos actualizados en localStorage
                localStorage.setItem('loggedUser', JSON.stringify(userData));
                console.log('Usuario guardado en localStorage:', JSON.parse(localStorage.getItem('loggedUser'))); // Verifica que se guardó correctamente
    
                // También puedes usar el LocalStorageService si tienes uno configurado
                const localStorageService = new LocalStorageService();
                localStorageService.addLoggedUser(userData);
    
                alert(result.message);  // O el mensaje que quieras mostrar
                navigate('/home');  // Redirigir al home después del login
            } else {
                setError('Error al recibir datos del usuario.');
            }
        } catch (err) {
            console.error('Error de login:', err);
            setError('Hubo un problema al intentar iniciar sesión. Por favor, intente nuevamente.');
        }
    };
    
    

    const submit = (e) => {
        e.preventDefault();
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        if (!handleValidation(email, password)) return;

        handleLogin(email, password);
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="relative flex w-96 flex-col rounded-xl bg-gray-800 text-gray-200 shadow-md border border-gray-700">
                    <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 shadow-lg shadow-blue-700/40">
                        <Building className="mx-auto h-12 w-auto text-white" />
                        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                            Flat Finder
                        </h3>
                    </div>
                    <form onSubmit={submit} className="flex flex-col gap-4 p-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                placeholder="Email"
                                ref={emailRef}
                                required
                                autoComplete="email"
                                type="email"
                                className="peer h-full w-full rounded-md border-2 border-gray-700 bg-gray-700 px-3 py-3 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-2 placeholder-shown:border-gray-700 focus:border-2 focus:border-blue-500 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
                            />
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                placeholder="Password"
                                ref={passwordRef}
                                required
                                autoComplete="current-password"
                                type={showPassword ? 'text' : 'password'}
                                className="peer h-full w-full rounded-md border-2 border-gray-700 bg-gray-700 px-3 py-3 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-2 placeholder-shown:border-gray-700 focus:border-2 focus:border-blue-500 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>
                        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        <div className="p-6 pt-0">
                            <button
                                type="submit"
                                className="block w-full select-none rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-700/20 transition-all hover:shadow-lg hover:shadow-blue-700/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Login
                            </button>
                            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-gray-200 antialiased">
                                Don't have an account?
                                <a
                                    className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-500 antialiased"
                                    href="/register"
                                >
                                    Register
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
localStorage.removeItem('loggedUser');  // Elimina el usuario previo antes de guardar el nuevo

export default LoginPage;







