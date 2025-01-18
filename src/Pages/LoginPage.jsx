import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Building } from 'lucide-react'; // Importa el logo desde lucide-react

const LoginPage = () => {
    const email = useRef();
    const password = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const validatePassword = (password) => {
        const regex = /^.{6,}$/;
        return regex.test(password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validatePassword(password.current.value)) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
            alert('Login exitoso');
            navigate('/home');
            setTimeout(() => {
                auth.signOut();
                alert('Sesión cerrada por inactividad');
                navigate('/login');
            }, 3600000); // 60 minutos
        } catch (error) {
            alert(error.message);
        }
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
                            <input placeholder="Email" ref={email} required autoComplete="email" className="peer h-full w-full rounded-md border-2 border-gray-700 bg-gray-700 px-3 py-3 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-2 placeholder-shown:border-gray-700 focus:border-2 focus:border-blue-500 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50" />
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input placeholder="Password" ref={password} required autoComplete="current-password" type={showPassword ? 'text' : 'password'} className="peer h-full w-full rounded-md border-2 border-gray-700 bg-gray-700 px-3 py-3 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-2 placeholder-shown:border-gray-700 focus:border-2 focus:border-blue-500 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>
                        <div className="-ml-2.5">
                            <div className="inline-flex items-center">
                                <label data-ripple-dark="true" htmlFor="checkbox" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input id="checkbox" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-700 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-700 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 hover:before:opacity-10" type="checkbox" />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth={1} stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                                        </svg>
                                    </span>
                                </label>
                                <label htmlFor="checkbox" className="mt-px cursor-pointer select-none font-light text-gray-200">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <button data-ripple-light="true" type="submit" className="block w-full select-none rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-700/20 transition-all hover:shadow-lg hover:shadow-blue-700/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                Login
                            </button>
                            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-gray-200 antialiased">
                                Don't have an account?
                                <a className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-500 antialiased" href="/register">
                                    Register
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }  

  export default LoginPage;  














