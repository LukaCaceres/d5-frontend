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
  const [filtroCategoria, setFiltroCategoria] = useState("")
  const [filtroTalle, setFiltroTalle] = useState("")
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

  const handleCategoriaChange = (categoria) => {
    if (filtroCategoria === categoria) {
      setFiltroCategoria("")
    } else {
      setFiltroCategoria(categoria)
    }
    setPaginaActual(1)
  }

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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <Squares2X2Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-indigo-500" />
            Nuestros Productos
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-400 mt-2">
            {totalProductos > 0 ? `${totalProductos} productos encontrados` : "Explora nuestra colección"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <FunnelIcon className="h-4 w-4 text-indigo-500" />
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
          <aside
            className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"} space-y-4 sm:space-y-6 lg:space-y-8`}
          >
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <AdjustmentsHorizontalIcon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                  Filtros
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
                  >
                    Limpiar todo
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Categorías</h3>
                <div className="space-y-2">
                  {categorias.map((cat) => (
                    <label
                      key={cat._id}
                      className="flex items-center gap-3 cursor-pointer group hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={filtroCategoria === cat.categoria}
                        onChange={() => handleCategoriaChange(cat.categoria)}
                        className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                      <span className="text-xs sm:text-sm text-gray-300 group-hover:text-indigo-400 transition-colors duration-200">
                        {cat.categoria}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Talles</h3>
                <div className="grid grid-cols-3 gap-2">
                  {tallesDisponibles.map((talle) => (
                    <button
                      key={talle}
                      onClick={() => handleTalleChange(talle)}
                      className={`py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 ${
                        filtroTalle === talle
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-gray-700 text-gray-300 border-gray-600 hover:border-indigo-400 hover:bg-gray-600"
                      }`}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-4">Rango de Precio</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs sm:text-sm text-gray-400">Precio mínimo</label>
                      <span className="text-xs sm:text-sm font-medium text-indigo-400">${precioMin || 0}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="100"
                      value={precioMin || 0}
                      onChange={(e) => setPrecioMin(e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs sm:text-sm text-gray-400">Precio máximo</label>
                      <span className="text-xs sm:text-sm font-medium text-indigo-400">${precioMax || 50000}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="100"
                      value={precioMax || 50000}
                      onChange={(e) => setPrecioMax(e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <section className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Sort and Results Header */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-400">
                    Mostrando {productos.length} de {totalProductos} productos
                  </span>
                  {activeFiltersCount > 0 && (
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full w-fit">
                      {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} activo
                      {activeFiltersCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300 whitespace-nowrap">Ordenar por:</label>
                  <select
                    value={ordenPrecio}
                    onChange={(e) => setOrdenPrecio(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[160px] sm:min-w-[180px]"
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
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 sm:p-8 lg:p-12 text-center">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Squares2X2Icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-500" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto">
                  No hay productos que coincidan con los filtros seleccionados. Intenta ajustar tus criterios de
                  búsqueda.
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 text-xs sm:text-sm lg:text-base"
                  >
                    <XMarkIcon className="h-4 w-4" />
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
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
              <div className="flex justify-center pt-4 sm:pt-6">
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
          background: #6366f1;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

export default ProductosPage
