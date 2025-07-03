"use client"

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Error404Page = () => {
    const navigate = useNavigate();

    const volverAlInicio = () => {
        navigate('/');
    };

    const volverAtras = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6 sm:mb-8">
                    <ExclamationTriangleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-400" />
                </div>

                {/* Error Content */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 mb-4">
                        404
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                        Lo sentimos, la página que estás buscando no se encuentra disponible 
                        por el momento o ha sido movida.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={volverAtras}
                            className="cursor-pointer flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Volver atrás
                        </button>
                        <button
                            onClick={volverAlInicio}
                            className="cursor-pointer flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                        >
                            <HomeIcon className="h-4 w-4" />
                            Ir al inicio
                        </button>
                    </div>
                </div>

                {/* Additional Help */}
                <div className="mt-6 sm:mt-8">
                    <p className="text-xs sm:text-sm text-gray-500">
                        Si crees que esto es un error, por favor{' '}
                        <button 
                            onClick={() => window.location.href = 'mailto:soporte@ejemplo.com'}
                            className="text-indigo-400 hover:text-indigo-300 underline transition-colors duration-200"
                        >
                            contáctanos
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Error404Page;
