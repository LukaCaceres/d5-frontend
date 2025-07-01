"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
    FunnelIcon,
    AdjustmentsHorizontalIcon,
    XMarkIcon,
    ChevronDownIcon,
    Squares2X2Icon,
} from "@heroicons/react/24/outline"
import ProductCard from "../components/ProductCard"
import Paginator from "../components/Paginator"

const tallesDisponibles = ["S", "M", "L", "XL", "XXL"]

const ProductosPage = () => {
    const [ordenPrecio, setOrdenPrecio] = useState("")
    const [productos, setProductos] = useState([])
    const [totalProductos, setTotalProductos] = useState(0)
    const [categorias, setCategorias] = useState([])
    const [filtroCategoria, setFiltroCategoria] = useState("") // solo 1 categoría
    const [filtroTalle, setFiltroTalle] = useState("") // solo 1 talle
    const [precioMin, setPrecioMin] = useState("")
    const [precioMax, setPrecioMax] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    const [showFilters, setShowFilters] = useState(false)
    const [loading, setLoading] = useState(true)

    const productosPorPagina = 9

    const fetchProductos = async () => {
        try {
            setLoading(true)
            const params = {
                limite: productosPorPagina,
                desde: (paginaActual - 1) * productosPorPagina,
            }

            if (ordenPrecio) params.orden = ordenPrecio
            if (filtroCategoria) params.categoria = filtroCategoria
            if (filtroTalle) params.talle = filtroTalle
            if (precioMin) params.precioMin = precioMin
            if (precioMax) params.precioMax = precioMax

            const res = await axios.get("https://doble-cinco-backend.onrender.com/api/producto", { params })
            setProductos(res.data.productos)
            setTotalProductos(res.data.total)
        } catch (error) {
            console.error("Error al obtener productos:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategorias = async () => {
        try {
            const res = await axios.get("https://doble-cinco-backend.onrender.com/api/categoria")
            setCategorias(res.data.categorias)
        } catch (error) {
            console.error("Error al obtener categorías:", error)
        }
    }

    useEffect(() => {
        fetchCategorias()
    }, [])

    useEffect(() => {
        fetchProductos()
    }, [paginaActual, ordenPrecio, filtroCategoria, filtroTalle, precioMin, precioMax])

    // Función para seleccionar categoría (solo una)
    const handleCategoriaChange = (categoria) => {
        if (filtroCategoria === categoria) {
            setFiltroCategoria("")
        } else {
            setFiltroCategoria(categoria)
        }
        setPaginaActual(1)
    }

    // Función para seleccionar talle (solo uno)
    const handleTalleChange = (talle) => {
        if (filtroTalle === talle) {
            setFiltroTalle("")
        } else {
            setFiltroTalle(talle)
        }
        setPaginaActual(1)
    }

    const clearAllFilters = () => {
        setFiltroCategoria("")
        setFiltroTalle("")
        setPrecioMin("")
        setPrecioMax("")
        setOrdenPrecio("")
        setPaginaActual(1)
    }

    const totalPaginas = Math.ceil(totalProductos / productosPorPagina)

    const activeFiltersCount = [filtroCategoria, filtroTalle, precioMin, precioMax].filter(Boolean).length

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                        <Squares2X2Icon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                        Nuestros Productos
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                        {totalProductos > 0 ? `${totalProductos} productos encontrados` : "Explora nuestra colección"}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full flex items-center justify-between bg-white border border-indigo-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <FunnelIcon className="h-4 w-4 text-indigo-600" />
                                Filtros
                                {activeFiltersCount > 0 && (
                                    <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </div>
                            <ChevronDownIcon
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>

                    {/* Filters Sidebar */}
                    <aside className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"} space-y-6 lg:space-y-8`}>
                        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 sm:p-6">
                            {/* Filter Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-indigo-600" />
                                    Filtros
                                </h2>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                                    >
                                        Limpiar todo
                                    </button>
                                )}
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Categorías</h3>
                                <div className="space-y-2">
                                    {categorias.map((cat) => (
                                        <label
                                            key={cat._id}
                                            className="flex items-center gap-3 cursor-pointer group hover:bg-indigo-50 rounded-lg p-2 transition-colors duration-200"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filtroCategoria === cat.categoria}
                                                onChange={() => handleCategoriaChange(cat.categoria)}
                                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-indigo-700 transition-colors duration-200">
                                                {cat.categoria}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mb-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Talles</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {tallesDisponibles.map((talle) => (
                                        <button
                                            key={talle}
                                            onClick={() => handleTalleChange(talle)}
                                            className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all duration-200 ${filtroTalle === talle
                                                    ? "bg-indigo-600 text-white border-indigo-600"
                                                    : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50"
                                                }`}
                                        >
                                            {talle}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-4">Rango de Precio</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm text-gray-600">Precio mínimo</label>
                                            <span className="text-sm font-medium text-indigo-600">${precioMin || 0}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50000"
                                            step="100"
                                            value={precioMin || 0}
                                            onChange={(e) => setPrecioMin(e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm text-gray-600">Precio máximo</label>
                                            <span className="text-sm font-medium text-indigo-600">${precioMax || 50000}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50000"
                                            step="100"
                                            value={precioMax || 50000}
                                            onChange={(e) => setPrecioMax(e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Section */}
                    <section className="lg:col-span-3 space-y-6">
                        {/* Sort and Results Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        Mostrando {productos.length} de {totalProductos} productos
                                    </span>
                                    {activeFiltersCount > 0 && (
                                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                            {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} activo
                                            {activeFiltersCount > 1 ? "s" : ""}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Ordenar por:</label>
                                    <select
                                        value={ordenPrecio}
                                        onChange={(e) => setOrdenPrecio(e.target.value)}
                                        className="border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[180px]"
                                    >
                                        <option value="">Seleccionar orden</option>
                                        <option value="asc">Precio: Menor a mayor</option>
                                        <option value="desc">Precio: Mayor a menor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {productos.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8 sm:p-12 text-center">
                                <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                    <Squares2X2Icon className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-400" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
                                <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto">
                                    No hay productos que coincidan con los filtros seleccionados. Intenta ajustar tus criterios de
                                    búsqueda.
                                </p>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                {productos.map((producto) => (
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

                        {/* Pagination */}
                        {totalPaginas > 1 && (
                            <div className="flex justify-center pt-6">
                                <Paginator currentPage={paginaActual} totalPages={totalPaginas} onPageChange={setPaginaActual} />
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Custom CSS for range sliders */}
            <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
        </div>
    )
}

export default ProductosPage
