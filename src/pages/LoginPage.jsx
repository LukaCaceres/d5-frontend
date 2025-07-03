"use client"
import { useState } from "react"
import {
    UserIcon,
    EyeIcon,
    EyeSlashIcon,
    ArrowRightOnRectangleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")

        if (!correo || !password) {
            setError("Todos los campos son obligatorios")
            return
        }

        try {
            const { data } = await axios.post("https://doble-cinco-backend.onrender.com/api/auth/login", {
                correo,
                password,
            })
            localStorage.setItem("token", data.token)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.msg || "Error al iniciar sesión")
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-900">
            {/* Image Section */}
            <div className="w-3/5 hidden lg:block relative">
                <img
                    src="https://i.postimg.cc/fW2dPYvS/MESSI.jpg"
                    alt="Leo Messi en Barcelona"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50"></div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-4 sm:p-8 bg-gray-900">
                <div className="w-full max-w-md space-y-6 sm:space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                            <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Iniciar Sesión</h2>
                        <p className="text-sm sm:text-base text-gray-400">Accede a tu cuenta</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                        <div>
                            <label htmlFor="correo" className="block text-sm font-medium text-gray-300 mb-2">
                                Correo electrónico
                            </label>
                            <input
                                id="correo"
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="tu@email.com"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
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

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
                                <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 sm:py-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                        >
                            <ArrowRightOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            Iniciar sesión
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
                        <button
                            onClick={() => navigate("/registro")}
                            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-center sm:text-left"
                        >
                            ¿No tienes cuenta? Regístrate
                        </button>
                        <button
                            onClick={() => navigate("/reset-password")}
                            className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-center sm:text-right"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
