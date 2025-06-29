import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!correo || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            const { data } = await axios.post('https://doble-cinco-backend.onrender.com/api/auth/login', {
                correo,
                password,
            });

            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Imagen izquierda */}
            <div className="w-3/5 hidden lg:block">
                <img
                    src="https://i.postimg.cc/fW2dPYvS/MESSI.jpg"
                    alt="Leo Messi en Barcelona"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Formulario derecha */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-3xl font-bold text-indigo-800">Iniciar Sesión</h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo</label>
                            <input
                                id="correo"
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="flex justify-between text-sm text-gray-600">
                        <button onClick={() => navigate('/registro')} className="cursor-pointer hover:underline">¿No tienes cuenta? Regístrate</button>
                        <button onClick={() => navigate('/reset-password')} className="cursor-pointer hover:underline">¿Olvidaste tu contraseña?</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
