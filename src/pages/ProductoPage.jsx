import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [talleSeleccionado, setTalleSeleccionado] = useState('');
    const [stockDisponible, setStockDisponible] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const res = await axios.get(`https://doble-cinco-backend.onrender.com/api/producto/${id}`);
                setProducto(res.data);
                setImagenPrincipal(res.data.imagenes?.[0] || '/placeholder.webp');
            } catch (error) {
                console.error('Error al obtener producto:', error);
            }
        };
        fetchProducto();
    }, [id]);

    const handleTalleChange = (e) => {
        const talle = e.target.value;
        setTalleSeleccionado(talle);
        setCantidad(1); // Reiniciar cantidad
        const talleData = producto.talles.find(t => t.talle === talle);
        setStockDisponible(talleData?.stock || 0);
    };
    const handleVerCarrito = async ()=> {
        if(!token){
            alert('Debes iniciar sesión para agregar al carrito');
            return;
        }
        navigate('/carrito')

    }
    const handleAgregarCarrito = async () => {
        if (!token) {
            alert('Debes iniciar sesión para agregar al carrito');
            return;
        }

        if (!talleSeleccionado) {
            alert('Selecciona un talle');
            return;
        }

        if (cantidad > stockDisponible) {
            alert(`No hay suficiente stock disponible para el talle ${talleSeleccionado}`);
            return;
        }

        try {
            await axios.post(
                'https://doble-cinco-backend.onrender.com/api/carrito/agregar',
                {
                    productoId: id,
                    cantidad,
                    talle: talleSeleccionado
                },
                { headers: { 'x-token': token } }
            );
            console.log(talleSeleccionado)
            alert('Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            alert('Error al agregar al carrito');
        }
    };

    if (!producto) return <div className="p-6 text-center">Cargando producto...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galería de imágenes */}
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    {producto.imagenes?.slice(0, 4).map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Miniatura ${idx}`}
                            className="w-20 h-20 object-cover rounded cursor-pointer border border-gray-300 hover:border-indigo-600"
                            onClick={() => setImagenPrincipal(img)}
                        />
                    ))}
                </div>
                <div className="flex-1">
                    <img
                        src={imagenPrincipal}
                        alt="Producto principal"
                        className="w-full h-[500px] object-cover rounded border border-gray-300"
                    />
                </div>
            </div>

            {/* Detalles del producto */}
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>
                <p className="text-2xl font-semibold text-indigo-700">${producto.precio.toFixed(2)}</p>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Talle:</label>
                    <select
                        value={talleSeleccionado}
                        onChange={handleTalleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        <option value="">Selecciona un talle</option>
                        {producto.talles.map((t, idx) => (
                            <option key={idx} value={t.talle}>
                                {t.talle} (Stock: {t.stock})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Cantidad:</label>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >-</button>
                        <span className="text-lg">{cantidad}</span>
                        <button
                            onClick={() => setCantidad(prev => Math.min(prev + 1, stockDisponible))}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >+</button>
                    </div>
                </div>

                <button
                    onClick={handleAgregarCarrito}
                    className="bg-indigo-500 hover:bg-indigo-900 text-white py-3 px-6 rounded text-sm font-medium transition"
                >
                    Agregar al carrito
                </button>

                <button
                    onClick={handleVerCarrito}
                    className="bg-indigo-500 hover:bg-indigo-900 text-white py-3 px-6 rounded text-sm font-medium transition mt-3"
                >
                    Ver en Carrito
                </button>
            </div>

            {/* Descripción debajo de todo */}
            <div className="lg:col-span-2 mt-12 border-t border-gray-300 pt-6">
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-700">{producto.descripcion}</p>
            </div>
        </div>
    );
};

export default ProductPage;
