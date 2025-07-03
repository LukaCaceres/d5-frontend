"use client"
import { useEffect, useState } from "react"
import {
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HomeIcon,
  Squares2X2Icon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../assets/images/d5-logo.webp"

const NavbarComponent = () => {
  const [esAdmin, setEsAdmin] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [menuAbierto, setMenuAbierto] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const verificarUsuario = async () => {
      if (!token) return

      try {
        const { data } = await axios.get("https://doble-cinco-backend.onrender.com/api/usuario/perfil", {
          headers: { "x-token": token },
        })
        setEsAdmin(data.rol === "ADMIN_ROLE")
      } catch (error) {
        localStorage.removeItem("token")
      }
    }

    verificarUsuario()
  }, [token])

  const cerrarSesion = () => {
    localStorage.removeItem("token")
    setEsAdmin(false)
    navigate("/")
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/resultados?query=${searchTerm}`)
      setMenuAbierto(false)
    }
  }

  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-800 relative z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <div className="flex-shrink-0 lg:w-1/3">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo Doble Cinco"
                className="h-8 w-auto filter brightness-0 invert"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="text-gray-300 hover:text-indigo-400 focus:outline-none p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              {menuAbierto ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center md:space-x-4 lg:space-x-6 flex-1 lg:w-1/3">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-800"
            >
              <HomeIcon className="h-4 w-4" />
              Inicio
            </Link>
            <Link
              to="/productos"
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-800"
            >
              <Squares2X2Icon className="h-4 w-4" />
              Productos
            </Link>
            <Link
              to="/conocenos"
              className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-800"
            >
              <InformationCircleIcon className="h-4 w-4" />
              Conócenos
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center justify-end space-x-4 lg:w-1/3">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm w-48 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </form>

            {token ? (
              <>
                <Link
                  to="/carrito"
                  className="text-gray-300 hover:text-indigo-400 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                </Link>
                <button
                  onClick={cerrarSesion}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Cerrar sesión
                </button>
                {esAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Cog6ToothIcon className="h-4 w-4" />
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <UserIcon className="h-4 w-4" />
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="flex items-center gap-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <UserPlusIcon className="h-4 w-4" />
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuAbierto && (
        <div className="md:hidden bg-gray-800 shadow-lg absolute top-16 left-0 right-0 w-full z-50 px-4 py-4 space-y-3 border-t border-gray-700 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-sm w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </form>

          {/* Mobile Navigation Links */}
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 font-medium py-3 px-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setMenuAbierto(false)}
          >
            <HomeIcon className="h-5 w-5" />
            Inicio
          </Link>
          <Link
            to="/productos"
            className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 font-medium py-3 px-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setMenuAbierto(false)}
          >
            <Squares2X2Icon className="h-5 w-5" />
            Productos
          </Link>
          <Link
            to="/conocenos"
            className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 font-medium py-3 px-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setMenuAbierto(false)}
          >
            <InformationCircleIcon className="h-5 w-5" />
            Conócenos
          </Link>

          {token ? (
            <>
              <Link
                to="/carrito"
                className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 py-3 px-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setMenuAbierto(false)}
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Carrito
              </Link>
              <button
                onClick={() => {
                  cerrarSesion()
                  setMenuAbierto(false)
                }}
                className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-red-400 py-3 px-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Cerrar sesión
              </button>
              {esAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 text-indigo-400 hover:text-indigo-300 py-3 px-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setMenuAbierto(false)}
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  Administrador
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 py-3 px-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setMenuAbierto(false)}
              >
                <UserIcon className="h-5 w-5" />
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="flex items-center gap-3 bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-4 rounded-lg transition-colors duration-200"
                onClick={() => setMenuAbierto(false)}
              >
                <UserPlusIcon className="h-5 w-5" />
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default NavbarComponent
