import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Paginator from '../components/Paginator';

const tallesDisponibles = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductosPage = () => {
    const [ordenPrecio, setOrdenPrecio] = useState('');
    const [productos, setProductos] = useState([]);
    const [totalProductos, setTotalProductos] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState(''); // solo 1 categoría
    const [filtroTalle, setFiltroTalle] = useState('');       // solo 1 talle
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 9;

    const fetchProductos = async () => {
        try {
            const params = {
                limite: productosPorPagina,
                desde: (paginaActual - 1) * productosPorPagina,
            };

            if (ordenPrecio) params.orden = ordenPrecio;
            if (filtroCategoria) params.categoria = filtroCategoria;
            if (filtroTalle) params.talle = filtroTalle;
            if (precioMin) params.precioMin = precioMin;
            if (precioMax) params.precioMax = precioMax;

            const res = await axios.get('https://doble-cinco-backend.onrender.com/api/producto', { params });
            setProductos(res.data.productos);
            setTotalProductos(res.data.total);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const res = await axios.get('https://doble-cinco-backend.onrender.com/api/categoria');
            setCategorias(res.data.categorias);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    useEffect(() => {
        fetchProductos();
    }, [paginaActual, ordenPrecio, filtroCategoria, filtroTalle, precioMin, precioMax]);

    // Función para seleccionar categoría (solo una)
    const handleCategoriaChange = (categoria) => {
        if (filtroCategoria === categoria) {
            setFiltroCategoria('');
        } else {
            setFiltroCategoria(categoria);
        }
        setPaginaActual(1);
    };

    // Función para seleccionar talle (solo uno)
    const handleTalleChange = (talle) => {
        if (filtroTalle === talle) {
            setFiltroTalle('');
        } else {
            setFiltroTalle(talle);
        }
        setPaginaActual(1);
    };
    
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filtros */}
            <aside className="md:col-span-1 space-y-8">
                {/* Categorías */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Categorías</h2>
                    <ul className="space-y-2">
                        {categorias.map(cat => (
                            <li key={cat._id}>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filtroCategoria === cat.categoria}
                                        onChange={() => handleCategoriaChange(cat.categoria)}
                                    />
                                    {cat.categoria}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Talles */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Talles</h2>
                    <ul className="space-y-2">
                        {tallesDisponibles.map(talle => (
                            <li key={talle}>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filtroTalle === talle}
                                        onChange={() => handleTalleChange(talle)}
                                    />
                                    {talle}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Precio */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Precio</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Precio mínimo: ${precioMin || 0}</label>
                            <input
                                type="range"
                                min="0"
                                max="50000"
                                step="100"
                                value={precioMin}
                                onChange={(e) => setPrecioMin(e.target.value)}
                                className="w-full accent-indigo-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Precio máximo: ${precioMax || 50000}</label>
                            <input
                                type="range"
                                min="0"
                                max="50000"
                                step="100"
                                value={precioMax}
                                onChange={(e) => setPrecioMax(e.target.value)}
                                className="w-full accent-indigo-600"
                            />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Productos */}
            <section className="md:col-span-3 space-y-6">
                {/* Orden */}
                <div className="flex justify-end">
                    <label className="text-sm font-medium text-gray-700 mr-2">Ordenar por:</label>
                    <select
                        value={ordenPrecio}
                        onChange={(e) => setOrdenPrecio(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="asc">Precio: Menor a mayor</option>
                        <option value="desc">Precio: Mayor a menor</option>
                    </select>
                </div>

                {productos.length === 0 ? (
                    <p className="text-center text-gray-500">No se encontraron productos con estos filtros.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productos.map(producto => (
                            <ProductCard
                                key={producto._id}
                                id={producto._id}
                                title={producto.nombre}
                                price={producto.precio}
                                image={producto.imagenes?.[0]}
                            />
                        ))}
                    </div>
                )}

                {totalPaginas > 1 && (
                    <div className="mt-10 flex justify-center">
                        <Paginator
                            currentPage={paginaActual}
                            totalPages={totalPaginas}
                            onPageChange={setPaginaActual}
                        />
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductosPage;
