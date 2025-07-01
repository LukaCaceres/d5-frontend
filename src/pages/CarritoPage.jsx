"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { TrashIcon, MinusIcon, PlusIcon, ShoppingCartIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
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
            const agrupado = productos.reduce((acc, item) => {
                const clave = item.producto._id + "-" + item.talle
                acc[clave] = acc[clave] || { ...item, cantidad: 0 }
                acc[clave].cantidad += item.cantidad
                return acc
            }, {})

            setCarrito(Object.values(agrupado))
        } catch (err) {
            console.error("Error al obtener el carrito:", err)
        } finally {
            setLoading(false)
        }
    }
    console.log(carrito)
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
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <ShoppingCartIcon className="h-8 w-8 text-indigo-600" />
                        Tu Carrito
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {carrito.length === 0
                            ? "Tu carrito está vacío"
                            : `${carrito.length} producto${carrito.length > 1 ? "s" : ""} en tu carrito`}
                    </p>
                </div>

                {carrito.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                            <ShoppingCartIcon className="h-12 w-12 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Parece que aún no has agregado ningún producto a tu carrito. ¡Explora nuestra tienda y encuentra algo que
                            te guste!
                        </p>
                        <button
                            onClick={() => navigate("/productos")}
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Explorar productos
                            <ArrowRightIcon className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Products List */}
                        <div className="lg:col-span-2 space-y-4">
                            {carrito.map(({ producto, cantidad, talle }) => (
                                <div
                                    key={producto._id + talle}
                                    className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={producto.imagenes?.[0] || "https://via.placeholder.com/120"}
                                                alt={producto.nombre}
                                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border-2 border-indigo-100"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{producto.nombre}</h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                    Talle: {talle}
                                                </span>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-gray-500">Cantidad:</span>
                                                <div className="flex items-center border border-indigo-200 rounded-lg">
                                                    <button
                                                        onClick={() => actualizarCantidad(producto._id, talle, -1)}
                                                        disabled={cantidad <= 1}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors duration-200 rounded-l-lg"
                                                    >
                                                        <MinusIcon className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
                                                        {cantidad}
                                                    </span>
                                                    <button
                                                        onClick={() => actualizarCantidad(producto._id, talle, 1)}
                                                        disabled={cantidad >= (producto.talles?.find((s) => s.talle === talle)?.stock || 0)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors duration-200 rounded-r-lg"
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
                                                <p className="text-sm text-gray-500">Precio unitario</p>
                                                <p className="text-lg font-semibold text-gray-900">${producto.precio}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Subtotal</p>
                                                <p className="text-xl font-bold text-indigo-600">${producto.precio * cantidad}</p>
                                            </div>
                                            <button
                                                onClick={() => eliminarItem(producto._id, talle)}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
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
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 sticky top-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de compra</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>
                                            Subtotal ({carrito.length} producto{carrito.length > 1 ? "s" : ""})
                                        </span>
                                        <span>${total}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-indigo-600">${total}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    Proceder al pago
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>

                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => navigate("/productos")}
                                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-200"
                                    >
                                        ← Continuar comprando
                                    </button>
                                </div>

                                {/* Security Badge */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
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
