import React, { useEffect, useState } from 'react';
import {
    ShoppingBagIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/d5-logo-black.webp'
import axios from 'axios';

const NavbarComponent = () => {
    const [esAdmin, setEsAdmin] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const verificarUsuario = async () => {
            if (!token) return;
            try {
                const { data } = await axios.get('https://doble-cinco-backend.onrender.com/api/usuario/perfil', {
                    headers: { 'x-token': token }
                });
                setEsAdmin(data.rol === 'ADMIN_ROLE');
            } catch (error) {
                localStorage.removeItem('token');
            }
        };
        verificarUsuario();
    }, [token]);
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setEsAdmin(false);
        navigate('/');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/resultados?query=${searchTerm}`);
            setMenuAbierto(false);
        }
    };

    return (
        <header className="bg-white shadow relative z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 w-full">
                    <div className="flex-shrink-0 lg:w-1/3">
                        <Link to="/">
                            <img className="h-8 w-auto" src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMenuAbierto(!menuAbierto)}
                            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-4 w-full justify-center lg:w-1/3">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Inicio</Link>
                        <Link to="/productos" className="text-gray-700 hover:text-indigo-600 font-medium">Productos</Link>
                        <Link to="/conocenos" className="text-gray-700 hover:text-indigo-600 font-medium">Conócenos</Link>
                    </div>
                    <div className="hidden md:flex items-center justify-end space-x-4 lg:w-1/3">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="border border-gray-300 rounded px-3 py-1 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </form>

                        {token ? (
                            <>
                                <Link to="/carrito" className="text-gray-400 hover:text-gray-500 me-4">
                                    <ShoppingBagIcon className="h-6 w-6" />
                                </Link>
                                <button onClick={cerrarSesion} className="cursor-pointer text-sm font-medium text-gray-700 hover:text-red-600">Cerrar sesión</button>
                                {esAdmin && (
                                    <Link to="/admin" className="text-sm font-medium text-indigo-700 hover:text-indigo-900">Administrador</Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600">Iniciar sesión</Link>
                                <Link to="/registro" className="text-sm font-medium text-gray-700 hover:text-indigo-600">Crear cuenta</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {menuAbierto && (
                <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full z-50 px-4 py-6 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <form onSubmit={handleSearchSubmit} className="w-full">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="border border-gray-300 rounded px-3 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </form>
                        <button onClick={() => setMenuAbierto(false)} className="ml-4 text-gray-600 hover:text-red-500">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <Link to="/" className="block text-gray-700 hover:text-indigo-600 font-medium">Inicio</Link>
                    <Link to="/productos" className="block text-gray-700 hover:text-indigo-600 font-medium">Productos</Link>
                    <Link to="/conocenos" className="block text-gray-700 hover:text-indigo-600 font-medium">Conócenos</Link>

                    {token ? (
                        <>
                            <Link to="/carrito" className="block text-gray-700 hover:text-indigo-600">Carrito</Link>
                            <button
                                onClick={cerrarSesion}
                                className="w-full text-left text-gray-700 hover:text-red-600"
                            >
                                Cerrar sesión
                            </button>
                            {esAdmin && (
                                <Link to="/admin" className="block text-indigo-700 hover:text-indigo-900">Administrador</Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-gray-700 hover:text-indigo-600">Iniciar sesión</Link>
                            <Link to="/registro" className="block text-gray-700 hover:text-indigo-600">Crear cuenta</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default NavbarComponent;
