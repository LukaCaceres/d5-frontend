"use client"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ShoppingCartIcon,
  EyeIcon,
  MinusIcon,
  PlusIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import axios from "axios"

const ProductoPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [imagenPrincipal, setImagenPrincipal] = useState("")
  const [cantidad, setCantidad] = useState(1)
  const [talleSeleccionado, setTalleSeleccionado] = useState("")
  const [stockDisponible, setStockDisponible] = useState(0)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`https://doble-cinco-backend.onrender.com/api/producto/${id}`)
        setProducto(res.data)
        setImagenPrincipal(res.data.imagenes?.[0] || "/placeholder.webp")
      } catch (error) {
        console.error("Error al obtener producto:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducto()
  }, [id])

  const handleTalleChange = (e) => {
    const talle = e.target.value
    setTalleSeleccionado(talle)
    setCantidad(1)
    const talleData = producto.talles.find((t) => t.talle === talle)
    setStockDisponible(talleData?.stock || 0)
  }

  const handleVerCarrito = async () => {
    if (!token) {
      alert("Debes iniciar sesión para agregar al carrito")
      return
    }
    navigate("/carrito")
  }

  const handleAgregarCarrito = async () => {
    if (!token) {
      alert("Debes iniciar sesión para agregar al carrito")
      return
    }

    if (!talleSeleccionado) {
      alert("Selecciona un talle")
      return
    }

    if (cantidad > stockDisponible) {
      alert(`No hay suficiente stock disponible para el talle ${talleSeleccionado}`)
      return
    }

    try {
      await axios.post(
        "https://doble-cinco-backend.onrender.com/api/carrito/agregar",
        {
          productoId: id,
          cantidad,
          talle: talleSeleccionado.trim().toUpperCase(),
        },
        { headers: { "x-token": token } },
      )
      alert("Producto agregado al carrito")
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
      alert("Error al agregar al carrito")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 mx-4">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Producto no encontrado</h2>
          <button
            onClick={() => navigate("/productos")}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
          >
            ← Volver a productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/productos")}
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium mb-6 transition-colors duration-200 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 hover:border-indigo-500"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a productos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-800 border border-gray-700">
              <img
                src={imagenPrincipal || "/placeholder.svg"}
                alt="Producto principal"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {producto.imagenes && producto.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {producto.imagenes.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagenPrincipal(img)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      imagenPrincipal === img
                        ? "border-indigo-500 ring-2 ring-indigo-400/50"
                        : "border-gray-600 hover:border-indigo-400"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4">
                {producto.nombre}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-400">
                  ${producto.precio.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Disponible</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">Selecciona tu talle:</label>
              <select
                value={talleSeleccionado}
                onChange={handleTalleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              >
                <option value="">Elige un talle</option>
                {producto.talles.map((t, idx) => (
                  <option key={idx} value={t.talle} disabled={t.stock === 0}>
                    {t.talle} {t.stock === 0 ? "(Sin stock)" : `(Stock: ${t.stock})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selection */}
            {talleSeleccionado && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">Cantidad:</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800">
                    <button
                      onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                      disabled={cantidad <= 1}
                      className="p-2 sm:p-3 text-indigo-400 hover:bg-gray-700 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors duration-200 rounded-l-lg"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="px-4 sm:px-6 py-2 sm:py-3 text-lg font-medium text-white min-w-[3rem] sm:min-w-[4rem] text-center">
                      {cantidad}
                    </span>
                    <button
                      onClick={() => setCantidad((prev) => Math.min(prev + 1, stockDisponible))}
                      disabled={cantidad >= stockDisponible}
                      className="p-2 sm:p-3 text-indigo-400 hover:bg-gray-700 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors duration-200 rounded-r-lg"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">Stock disponible: {stockDisponible}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAgregarCarrito}
                disabled={!talleSeleccionado || stockDisponible === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Agregar al carrito
              </button>

              <button
                onClick={handleVerCarrito}
                className="w-full border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Ver carrito
              </button>
            </div>

            {/* Stock Warning */}
            {talleSeleccionado && stockDisponible <= 5 && stockDisponible > 0 && (
              <div className="bg-amber-900/50 border border-amber-600 rounded-lg p-4">
                <p className="text-amber-300 text-sm font-medium flex items-center gap-2">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  ¡Últimas unidades! Solo quedan {stockDisponible} en stock.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-8 sm:mt-12 lg:mt-16 border-t border-gray-700 pt-6 sm:pt-8">
          <div className="max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Descripción del producto</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {producto.descripcion || "Este producto no tiene descripción disponible."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductoPage
