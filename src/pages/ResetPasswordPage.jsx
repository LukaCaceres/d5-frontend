"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

const ResetPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !confirmar) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      setLoading(true)
      setError("")

      const { data } = await axios.post("https://doble-cinco-backend.onrender.com/api/auth/reset-password", {
        token,
        password,
      })

      setMensaje(data.msg)
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError(err.response?.data?.msg || "Hubo un error al cambiar la contraseña")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-8">
      <div className="bg-gray-800 border border-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LockClosedIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-indigo-400 text-xl sm:text-2xl font-bold">Restablecer contraseña</h2>
          <p className="text-gray-400 text-sm mt-2">Ingresa tu nueva contraseña para continuar</p>
        </div>

        {/* Success Message */}
        {mensaje && (
          <div className="mb-4 p-4 bg-green-900/50 border border-green-700 rounded-lg flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
            <p className="text-green-300 text-sm">{mensaje}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Nueva contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {password && password.length < 6 && (
              <p className="text-yellow-400 text-xs mt-1">La contraseña debe tener al menos 6 caracteres</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Confirmar contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {confirmar && password !== confirmar && (
              <p className="text-red-400 text-xs mt-1">Las contraseñas no coinciden</p>
            )}
            {confirmar && password === confirmar && password.length >= 6 && (
              <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                <CheckCircleIcon className="h-3 w-3" />
                Las contraseñas coinciden
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !password || !confirmar || password !== confirmar || password.length < 6}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Guardando...
              </>
            ) : (
              <>
                <LockClosedIcon className="h-4 w-4" />
                Guardar nueva contraseña
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-xs">
            ¿Recordaste tu contraseña?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
            >
              Volver al login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
