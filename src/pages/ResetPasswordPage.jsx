// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmar) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (password !== confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const { data } = await axios.post('https://doble-cinco-backend.onrender.com/api/auth/reset-password', {
                token,
                password
            });

            setMensaje(data.msg);
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Hubo un error al cambiar la contraseña');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-indigo-800 text-2xl font-bold text-center mb-4">Restablecer contraseña</h2>
                {mensaje && <p className="text-green-600 text-center mb-4">{mensaje}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nueva contraseña</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Confirmar contraseña</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                    >
                        Guardar nueva contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
