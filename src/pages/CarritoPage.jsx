"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const fetchCarrito = async () => {
    try {
      setLoading(true)
      const res = await axios.get("https://doble-cinco-backend.onrender.com/api/carrito", {
        headers: { "x-token": token },
      })
      const productos = res.data.productos || []
      setCarrito(productos) // 👈 NO AGRUPAMOS
    } catch (err) {
      console.error("Error al obtener el carrito:", err)
    } finally {
      setLoading(false)
    }
  }

  const actualizarCantidad = async (productoId, talle, cambio) => {
    const item = carrito.find((p) => p.producto._id === productoId && p.talle === talle)
    if (!item) return

    const cantidadActual = item.cantidad
    const stockDisponible = item.producto.talles?.find((s) => s.talle === talle)?.stock || 0
    const nuevaCantidad = cantidadActual + cambio

    if (cambio === 1 && nuevaCantidad > stockDisponible) return
    if (cambio === -1 && nuevaCantidad < 1) return

    try {
      await axios.put(
        "https://doble-cinco-backend.onrender.com/api/carrito/cantidad",
        { productoId, cantidad: cambio, talle },
        { headers: { "x-token": token } },
      )
      fetchCarrito()
    } catch (err) {
      console.error("Error al actualizar cantidad:", err)
    }
  }

  const eliminarItem = async (productoId, talle) => {
    try {
      await axios.put(
        "https://doble-cinco-backend.onrender.com/api/carrito/eliminar",
        { productoId, talle },
        { headers: { "x-token": token } },
      )
      fetchCarrito()
    } catch (err) {
      console.error("Error al eliminar producto:", err)
    }
  }

  useEffect(() => {
    fetchCarrito()
  }, [])

  useEffect(() => {
    const nuevoTotal = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0)
    setTotal(nuevoTotal)
  }, [carrito])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  const handlePagar = async () => {
    try {
      const res = await axios.post(
        "https://doble-cinco-backend.onrender.com/api/payment/crear_preferencia",
        {},
        {
          headers: { "x-token": token },
        },
      )
      const { id } = res.data
      if (id) {
        navigate(`/checkout?preferenceId=${id}`)
      } else {
        alert("No se pudo generar la preferencia")
      }
    } catch (error) {
      console.error("❌ Error al generar preferencia:", error)
      alert("Hubo un problema al iniciar el pago.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <ShoppingCartIcon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
            Tu Carrito
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            {carrito.length === 0
              ? "Tu carrito está vacío"
              : `${carrito.length} producto${carrito.length > 1 ? "s" : ""} en tu carrito`}
          </p>
        </div>

        {carrito.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <ShoppingCartIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Tu carrito está vacío</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
              Parece que aún no has agregado ningún producto a tu carrito. ¡Explora nuestra tienda y encuentra algo que
              te guste!
            </p>
            <button
              onClick={() => navigate("/productos")}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Explorar productos
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Products List */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {carrito.map(({ producto, cantidad, talle }) => (
                <div
                  key={producto._id + talle}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 hover:bg-gray-750 transition-colors duration-200"
                >
                  {/* Mobile Layout */}
                  <div className="flex flex-col sm:hidden space-y-4">
                    {/* Product Image and Basic Info */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src={producto.imagenes?.[0] || "https://via.placeholder.com/120"}
                          alt={producto.nombre}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-gray-600"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white mb-1 line-clamp-2">{producto.nombre}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-200">
                          Talle: {talle}
                        </span>
                      </div>
                      <button
                        onClick={() => eliminarItem(producto._id, talle)}
                        className="cursor-pointer p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                        title="Eliminar producto"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Cantidad:</span>
                        <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                          <button
                            onClick={() => actualizarCantidad(producto._id, talle, -1)}
                            disabled={cantidad <= 1}
                            className="cursor-pointer p-1.5 text-indigo-400 hover:bg-gray-600 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors duration-200 rounded-l-lg"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </button>
                          <span className="px-3 py-1.5 text-sm font-medium text-white min-w-[2.5rem] text-center">
                            {cantidad}
                          </span>
                          <button
                            onClick={() => actualizarCantidad(producto._id, talle, 1)}
                            disabled={cantidad >= (producto.talles?.find((s) => s.talle === talle)?.stock || 0)}
                            className="cursor-pointer p-1.5 text-indigo-400 hover:bg-gray-600 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors duration-200 rounded-r-lg"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-indigo-400">${producto.precio * cantidad}</p>
                        <p className="text-xs text-gray-400">${producto.precio} c/u</p>
                      </div>
                    </div>

                    {/* Stock Info */}
                    <p className="text-xs text-gray-500">
                      Stock disponible: {producto.talles?.find((s) => s.talle === talle)?.stock || 0}
                    </p>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-start gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={producto.imagenes?.[0] || "https://via.placeholder.com/120"}
                        alt={producto.nombre}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border-2 border-gray-600"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">{producto.nombre}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-200">
                          Talle: {talle}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Cantidad:</span>
                        <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                          <button
                            onClick={() => actualizarCantidad(producto._id, talle, -1)}
                            disabled={cantidad <= 1}
                            className="cursor-pointer p-2 text-indigo-400 hover:bg-gray-600 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors duration-200 rounded-l-lg"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium text-white min-w-[3rem] text-center">
                            {cantidad}
                          </span>
                          <button
                            onClick={() => actualizarCantidad(producto._id, talle, 1)}
                            disabled={cantidad >= (producto.talles?.find((s) => s.talle === talle)?.stock || 0)}
                            className="cursor-pointer p-2 text-indigo-400 hover:bg-gray-600 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors duration-200 rounded-r-lg"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Stock Info */}
                      <p className="text-xs text-gray-500 mt-2">
                        Stock disponible: {producto.talles?.find((s) => s.talle === talle)?.stock || 0}
                      </p>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Precio unitario</p>
                        <p className="text-lg font-semibold text-white">${producto.precio}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-xl font-bold text-indigo-400">${producto.precio * cantidad}</p>
                      </div>
                      <button
                        onClick={() => eliminarItem(producto._id, talle)}
                        className="cursor-pointer p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                        title="Eliminar producto"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 lg:sticky lg:top-8">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Resumen de compra</h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-gray-300">
                    <span>
                      Subtotal ({carrito.length} producto{carrito.length > 1 ? "s" : ""})
                    </span>
                    <span>${total}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-bold text-white">Total</span>
                      <span className="text-xl sm:text-2xl font-bold text-indigo-400">${total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePagar}
                  className="cursor-pointer w-full bg-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Proceder al pago
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div className="mt-3 sm:mt-4 text-center">
                  <button
                    onClick={() => navigate("/productos")}
                    className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-medium text-xs sm:text-sm transition-colors duration-200"
                  >
                    ← Continuar comprando
                  </button>
                </div>

                {/* Security Badge */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-600">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                    <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                    Compra 100% segura
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarritoPage
