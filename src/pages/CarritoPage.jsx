import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const CarritoPage = () => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const fetchCarrito = async () => {
        try {
            const res = await axios.get('https://doble-cinco-backend.onrender.com/api/carrito', {
                headers: {
                    'x-token': token
                }
            });
            setCarrito(res.data.productos);
        } catch (err) {
            console.error('Error al obtener el carrito:', err);
        }
    };

    const actualizarCantidad = async (productoId, talle, nuevaCantidad) => {
        try {
            await axios.put(
                'https://doble-cinco-backend.onrender.com/api/carrito/cantidad',
                { productoId, cantidad: nuevaCantidad, talle },
                { headers: { 'x-token': token } }
            );
            fetchCarrito();
        } catch (err) {
            console.error('Error al actualizar cantidad:', err);
        }
    };


    const eliminarItem = async (productoId, talle) => {
        try {
            await axios.put(
                'https://doble-cinco-backend.onrender.com/api/carrito/eliminar',
                { productoId, talle },
                { headers: { 'x-token': token } }
            );
            fetchCarrito();
        } catch (err) {
            console.error('Error al eliminar producto:', err);
        }
    };

    useEffect(() => {
        fetchCarrito();
    }, []);

    useEffect(() => {
        const nuevoTotal = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
        setTotal(nuevoTotal);
    }, [carrito]);

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Productos */}
            <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Tu carrito</h2>
                {carrito.length === 0 ? (
                    <p>No hay productos en tu carrito.</p>
                ) : (
                    carrito.map(({ producto, cantidad, talle }) => (
                        <div key={producto._id + talle} className="flex items-center gap-6 border p-4 rounded-lg shadow-sm">
                            <img
                                src={producto.imagenes?.[0] || 'https://via.placeholder.com/100'}
                                alt={producto.nombre}
                                className="w-20 h-20 object-cover rounded"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold">{producto.nombre}</h3>
                                <p className="text-sm text-gray-500">Talle: {talle}</p>
                                <div className="flex items-center mt-2 gap-3">
                                    <button
                                        onClick={() => actualizarCantidad(producto._id, talle, cantidad - 1)}
                                        disabled={cantidad <= 1}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span>{cantidad}</span>
                                    <button
                                        onClick={() => actualizarCantidad(producto._id, talle, cantidad + 1)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>

                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">${producto.precio * cantidad}</span>
                                <TrashIcon
                                    className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800"
                                    onClick={() => eliminarItem(producto._id, talle)}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Resumen */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-xl font-bold">Resumen de compra</h2>
                <div className="flex justify-between text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span>${total}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <button
                    onClick={() => navigate('/checkout')}
                    className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                >
                    Ir a pagar
                </button>
            </div>
        </div>
    );
};

export default CarritoPage;
