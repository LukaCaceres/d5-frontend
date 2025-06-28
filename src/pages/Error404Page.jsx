import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404Page = () => {
    const navigate = useNavigate();

    const volverAlInicio = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
                <h1 className="text-4xl font-bold text-indigo-600 mb-4">Error 404</h1>
                <p className="text-gray-700 mb-6">Esta página no se encuentra disponible por el momento.</p>
                <button
                    onClick={volverAlInicio}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default Error404Page