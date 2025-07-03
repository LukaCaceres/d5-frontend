"use client"
import { useSearchParams } from "react-router-dom"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import { LockClosedIcon, ExclamationTriangleIcon, CreditCardIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"

// Initialize MercadoPago with the public key
initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY)

const CheckoutPage = () => {
    const [searchParams] = useSearchParams()
    const preferenceId = searchParams.get("preferenceId")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-6 sm:py-10 px-4 sm:px-6">
            <div className="max-w-md w-full p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-indigo-900/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-indigo-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                {/* Header */}
                <div className="relative z-10 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-600/20 rounded-lg">
                            <CreditCardIcon className="h-6 w-6 text-indigo-400" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Finalizá tu compra</h1>
                    </div>
                    <p className="text-indigo-300 text-sm">Estás a un paso de completar tu pedido</p>
                </div>

                {/* Payment section */}
                <div className="relative z-10 bg-gray-700/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-600">
                    {preferenceId ? (
                        <>
                            {/* Payment method header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                                        <span className="text-gray-300 text-sm font-medium">Método de pago seguro</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* Payment method indicators */}
                                        <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">V</span>
                                        </div>
                                        <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">M</span>
                                        </div>
                                        <div className="w-8 h-5 bg-yellow-500 rounded flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">MP</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-6"></div>
                            </div>

                            {/* MercadoPago Wallet Container */}
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600/50 mb-6">
                                <Wallet
                                    initialization={{ preferenceId }}
                                    customization={{
                                        texts: { valueProp: "smart_option" },
                                        visual: {
                                            buttonBackground: "default",
                                            borderRadius: "6px",
                                        },
                                    }}
                                />
                            </div>

                            {/* Security features */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-300 text-sm">
                                    <LockClosedIcon className="h-4 w-4 text-green-400 flex-shrink-0" />
                                    <span>Pago seguro y encriptado SSL</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300 text-sm">
                                    <ShieldCheckIcon className="h-4 w-4 text-green-400 flex-shrink-0" />
                                    <span>Protección al comprador garantizada</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Error state */
                        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                            <div className="p-3 bg-red-900/20 rounded-full mb-4">
                                <ExclamationTriangleIcon className="h-12 w-12 text-red-400" />
                            </div>
                            <h3 className="text-red-400 text-lg font-semibold mb-2">Error de pago</h3>
                            <p className="text-red-300 text-center font-medium mb-2">No se encontró la preferencia de pago.</p>
                            <p className="text-gray-400 text-sm text-center max-w-xs">
                                Por favor, vuelve al carrito e intenta nuevamente o contacta con soporte.
                            </p>
                            <button
                                onClick={() => window.history.back()}
                                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                                Volver al carrito
                            </button>
                        </div>
                    )}
                </div>

                {/* Trust indicators */}
                {preferenceId && (
                    <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Conexión segura</span>
                        </div>
                        <div className="w-px h-4 bg-gray-600"></div>
                        <div className="flex items-center gap-1">
                            <LockClosedIcon className="h-3 w-3" />
                            <span>Datos protegidos</span>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default CheckoutPage