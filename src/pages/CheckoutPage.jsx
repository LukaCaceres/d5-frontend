import React from "react"
import { useSearchParams } from "react-router-dom"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY)

const CheckoutPage = () => {
  const [searchParams] = useSearchParams()
  const preferenceId = searchParams.get("preferenceId")

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-10">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Finalizá tu compra</h1>
        {preferenceId ? (
          <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
        ) : (
          <p className="text-red-500">No se encontró la preferencia de pago.</p>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
