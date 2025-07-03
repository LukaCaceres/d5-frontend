"use client"
import { useState } from "react"
import {
  UserPlusIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline"
import axios from "axios"

const RegistroPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMensaje("")

    const { nombre, correo, password, confirmPassword } = formData

    if (!nombre || !correo || !password || !confirmPassword) {
      return setError("Todos los campos son obligatorios.")
    }

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.")
    }

    try {
      const { data } = await axios.post("https://doble-cinco-backend.onrender.com/api/usuario", {
        nombre,
        correo,
        password,
      })
      setMensaje("Usuario registrado correctamente.")
      setFormData({
        nombre: "",
        correo: "",
        password: "",
        confirmPassword: "",
      })
    } catch (err) {
      const msg = err.response?.data?.msg || "Error al registrar usuario."
      setError(msg)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-900">
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center px-4 sm:px-8 py-8 sm:py-12 bg-gray-900 order-2 lg:order-1">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
              <UserPlusIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Crear Cuenta</h2>
            <p className="text-sm sm:text-base text-gray-400">Únete a nuestra comunidad</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-300 mb-2">
                Correo electrónico
              </label>
              <input
                id="correo"
                type="email"
                name="correo"
                placeholder="tu@email.com"
                value={formData.correo}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Crea una contraseña segura"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
                <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            {mensaje && (
              <div className="flex items-center gap-2 text-green-400 text-sm bg-green-900/20 border border-green-800 rounded-lg p-3">
                <CheckCircleIcon className="h-4 w-4 flex-shrink-0" />
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 sm:py-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Crear cuenta
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block order-1 lg:order-2 relative">
        <img
          src="https://i.postimg.cc/Y0smmwSz/zidane.jpg"
          alt="Zidane jugando fútbol"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 to-transparent"></div>
      </div>
    </div>
  )
}

export default RegistroPage
