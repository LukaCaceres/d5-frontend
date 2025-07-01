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
    setCantidad(1) // Reiniciar cantidad
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Producto no encontrado</h2>
          <button onClick={() => navigate("/productos")} className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← Volver a productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/productos")}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a productos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-indigo-100">
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
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-gray-200 hover:border-indigo-300"
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{producto.nombre}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl sm:text-4xl font-bold text-indigo-600">${producto.precio.toFixed(2)}</p>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Disponible</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">Selecciona tu talle:</label>
              <select
                value={talleSeleccionado}
                onChange={handleTalleChange}
                className="w-full border border-indigo-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
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
                <label className="block text-sm font-semibold text-gray-900">Cantidad:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-indigo-200 rounded-lg">
                    <button
                      onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                      disabled={cantidad <= 1}
                      className="p-3 text-indigo-600 hover:bg-indigo-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors duration-200 rounded-l-lg"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 text-lg font-medium text-gray-900 min-w-[4rem] text-center">
                      {cantidad}
                    </span>
                    <button
                      onClick={() => setCantidad((prev) => Math.min(prev + 1, stockDisponible))}
                      disabled={cantidad >= stockDisponible}
                      className="p-3 text-indigo-600 hover:bg-indigo-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors duration-200 rounded-r-lg"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Stock disponible: {stockDisponible}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAgregarCarrito}
                disabled={!talleSeleccionado || stockDisponible === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Agregar al carrito
              </button>

              <button
                onClick={handleVerCarrito}
                className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-4 px-6 rounded-lg text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <EyeIcon className="h-5 w-5" />
                Ver carrito
              </button>
            </div>

            {/* Stock Warning */}
            {talleSeleccionado && stockDisponible <= 5 && stockDisponible > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm font-medium">
                  ⚠️ ¡Últimas unidades! Solo quedan {stockDisponible} en stock.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 lg:mt-16 border-t border-gray-200 pt-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción del producto</h2>
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-700 text-base leading-relaxed">
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
