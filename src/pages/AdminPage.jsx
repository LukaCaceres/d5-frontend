"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  StarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  Squares2X2Icon,
  TagIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  ShoppingBagIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"
import Paginator from "../components/Paginator"

const Tabs = ({ children }) => <div>{children}</div>

const TabsList = ({ children }) => (
  <div className="flex flex-wrap gap-1 sm:gap-2 bg-gray-800 border border-gray-700 rounded-xl p-1 shadow-sm mb-6 sm:mb-8">
    {children}
  </div>
)

const TabsTrigger = ({ value, selected, onClick, children, icon: Icon }) => (
  <button
    onClick={() => onClick(value)}
    className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
      selected === value ? "bg-indigo-600 text-white shadow-sm" : "text-gray-300 hover:text-white hover:bg-gray-700"
    }`}
  >
    {Icon && <Icon className="h-4 w-4" />}
    {children}
  </button>
)

const TabsContent = ({ value, selected, children }) => {
  if (value !== selected) return null
  return <div>{children}</div>
}

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState("usuarios")
  const [usuarios, setUsuarios] = useState([])
  const [usuarioBuscado, setUsuarioBuscado] = useState(null)
  const [busquedaId, setBusquedaId] = useState("")
  const [categorias, setCategorias] = useState([])
  const [nuevaCategoria, setNuevaCategoria] = useState("")
  const [editandoCategoriaId, setEditandoCategoriaId] = useState(null)
  const [categoriaEditada, setCategoriaEditada] = useState("")
  const [productos, setProductos] = useState([])
  const [editandoProductoId, setEditandoProductoId] = useState(null)
  const [productoEditado, setProductoEditado] = useState({})
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: 0,
    imagenes: [""],
    talles: [{ talle: "", stock: 0 }],
  })
  const [ordenes, setOrdenes] = useState([])
  const [totalOrdenes, setTotalOrdenes] = useState(0)
  const [desdeOrdenes, setDesdeOrdenes] = useState(0)
  const [totalProductos, setTotalProductos] = useState(0)
  const [totalUsuarios, setTotalUsuarios] = useState(0)
  const [desdeProductos, setDesdeProductos] = useState(0)
  const [desdeUsuarios, setDesdeUsuarios] = useState(0)
  const [busquedaProducto, setBusquedaProducto] = useState("")
  const [loading, setLoading] = useState(true)

  const limite = 10
  const token = localStorage.getItem("token")

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get(
        `https://doble-cinco-backend.onrender.com/api/usuario?desde=${desdeUsuarios}&limite=${limite}`,
        { headers: { "x-token": token } },
      )
      setUsuarios(res.data.usuarios || [])
      setTotalUsuarios(res.data.total || 0)
    } catch (err) {
      console.error("Error al obtener usuarios:", err)
    }
  }

  const buscarUsuarioPorId = async () => {
    try {
      const res = await axios.get(`https://doble-cinco-backend.onrender.com/api/usuario/${busquedaId}`, {
        headers: { "x-token": token },
      })
      setUsuarioBuscado(res.data)
    } catch (err) {
      console.error("Usuario no encontrado:", err)
      setUsuarioBuscado(null)
    }
  }

  const fetchCategorias = async () => {
    try {
      const res = await axios.get("https://doble-cinco-backend.onrender.com/api/categoria")
      setCategorias(res.data.categorias || [])
    } catch (err) {
      console.error("Error al obtener categorías:", err)
    }
  }

  const crearCategoria = async () => {
    try {
      await axios.post(
        "https://doble-cinco-backend.onrender.com/api/categoria",
        { categoria: nuevaCategoria },
        { headers: { "x-token": token } },
      )
      setNuevaCategoria("")
      fetchCategorias()
    } catch (err) {
      console.error("Error al crear categoría:", err)
    }
  }

  const actualizarCategoria = async (id) => {
    try {
      await axios.put(
        `https://doble-cinco-backend.onrender.com/api/categoria/${id}`,
        { categoria: categoriaEditada },
        { headers: { "x-token": token } },
      )
      setEditandoCategoriaId(null)
      setCategoriaEditada("")
      fetchCategorias()
    } catch (err) {
      console.error("Error al actualizar categoría:", err)
    }
  }

  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`https://doble-cinco-backend.onrender.com/api/categoria/${id}`, {
        headers: { "x-token": token },
      })
      fetchCategorias()
    } catch (err) {
      console.error("Error al eliminar categoría:", err)
    }
  }

  const fetchProductos = async () => {
    try {
      const url = busquedaProducto
        ? `https://doble-cinco-backend.onrender.com/api/producto?query=${encodeURIComponent(
            busquedaProducto,
          )}&desde=${desdeProductos}&limite=${limite}`
        : `https://doble-cinco-backend.onrender.com/api/producto?desde=${desdeProductos}&limite=${limite}`

      const res = await axios.get(url)
      setProductos(res.data.productos || [])
      setTotalProductos(res.data.total || 0)
    } catch (err) {
      console.error("Error al obtener productos:", err)
    }
  }

  const actualizarProducto = async (id) => {
    try {
      await axios.put(`https://doble-cinco-backend.onrender.com/api/producto/${id}`, productoEditado, {
        headers: { "x-token": token },
      })
      setEditandoProductoId(null)
      setProductoEditado({})
      fetchProductos()
    } catch (err) {
      console.error("Error al actualizar producto:", err)
    }
  }

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://doble-cinco-backend.onrender.com/api/producto/${id}`, {
        headers: { "x-token": token },
      })
      fetchProductos()
    } catch (err) {
      console.error("Error al eliminar producto:", err)
    }
  }

  const crearProducto = async () => {
    try {
      // Filtrar talles vacíos
      const productoAEnviar = {
        ...nuevoProducto,
        talles: nuevoProducto.talles.filter((t) => t.talle.trim() !== ""),
        imagenes: nuevoProducto.imagenes.filter((img) => img.trim() !== ""),
      }

      await axios.post("https://doble-cinco-backend.onrender.com/api/producto", productoAEnviar, {
        headers: { "x-token": token },
      })
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: 0,
        imagenes: [""],
        talles: [{ talle: "", stock: 0 }],
      })
      fetchProductos()
    } catch (err) {
      console.error("Error al crear producto:", err)
    }
  }

  const toggleDestacado = async (id, actual) => {
    try {
      await axios.put(
        `https://doble-cinco-backend.onrender.com/api/producto/${id}/destacar`,
        { destacado: !actual },
        { headers: { "x-token": token } },
      )
      fetchProductos()
    } catch (err) {
      console.error("Error al destacar producto:", err)
    }
  }

  const handleBuscarProducto = (e) => {
    e.preventDefault()
    setDesdeProductos(0) // Resetear a la primera página al realizar una nueva búsqueda
    fetchProductos()
  }

  const fetchOrdenes = async () => {
    try {
      const res = await axios.get(
        `https://doble-cinco-backend.onrender.com/api/orden?desde=${desdeOrdenes}&limite=${limite}`,
        { headers: { "x-token": token } },
      )
      setOrdenes(res.data.ordenes || [])
      setTotalOrdenes(res.data.total || 0)
    } catch (err) {
      console.error("Error al obtener órdenes:", err)
    }
  }

  const getEstadoOrden = (estado) => {
    switch (estado) {
      case "approved":
        return { texto: "Aprobado", color: "bg-green-900 text-green-200", icono: CheckCircleIcon }
      case "pending":
        return { texto: "Pendiente", color: "bg-yellow-900 text-yellow-200", icono: ClockIcon }
      case "rejected":
        return { texto: "Rechazado", color: "bg-red-900 text-red-200", icono: XCircleIcon }
      case "in_process":
        return { texto: "En proceso", color: "bg-blue-900 text-blue-200", icono: TruckIcon }
      default:
        return { texto: estado, color: "bg-gray-700 text-gray-200", icono: ShoppingBagIcon }
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchUsuarios(), fetchCategorias(), fetchProductos(), fetchOrdenes()])
      setLoading(false)
    }
    loadData()
  }, [desdeProductos, desdeUsuarios])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <ClipboardDocumentListIcon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
            Panel de Administración
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2">Gestiona usuarios, productos y categorías</p>
        </div>

        <Tabs>
          <TabsList>
            <TabsTrigger value="usuarios" selected={selectedTab} onClick={setSelectedTab} icon={UserGroupIcon}>
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="productos" selected={selectedTab} onClick={setSelectedTab} icon={Squares2X2Icon}>
              Productos
            </TabsTrigger>
            <TabsTrigger value="categorias" selected={selectedTab} onClick={setSelectedTab} icon={TagIcon}>
              Categorías
            </TabsTrigger>
            <TabsTrigger
              value="ordenes"
              selected={selectedTab}
              onClick={setSelectedTab}
              icon={ClipboardDocumentListIcon}
            >
              Órdenes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios" selected={selectedTab}>
            <div className="space-y-6">
              {/* User Search */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-indigo-400" />
                  Buscar Usuario
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Buscar usuario por ID"
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                      value={busquedaId}
                      onChange={(e) => setBusquedaId(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={buscarUsuarioPorId}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    Buscar
                  </button>
                </div>

                {usuarioBuscado && (
                  <div className="mt-4 bg-gray-700 border border-gray-600 p-4 rounded-lg">
                    <h3 className="font-semibold text-white mb-2">Usuario encontrado:</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-300">
                        <strong>Nombre:</strong> {usuarioBuscado.nombre}
                      </p>
                      <p className="text-gray-300">
                        <strong>Correo:</strong> {usuarioBuscado.correo}
                      </p>
                      <p className="text-gray-300">
                        <strong>Rol:</strong>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            usuarioBuscado.rol === "ADMIN_ROLE"
                              ? "bg-red-900 text-red-200"
                              : "bg-green-900 text-green-200"
                          }`}
                        >
                          {usuarioBuscado.rol}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Users Table */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <UserGroupIcon className="h-5 w-5 text-indigo-400" />
                    Todos los usuarios ({totalUsuarios})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Correo
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Rol
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {usuarios.map((u) => (
                        <tr key={u.uid} className="hover:bg-gray-750 transition-colors duration-200">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {u.nombre}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">{u.correo}</td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                u.rol === "ADMIN_ROLE" ? "bg-red-900 text-red-200" : "bg-green-900 text-green-200"
                              }`}
                            >
                              {u.rol}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 sm:px-6 py-4 border-t border-gray-700">
                  <Paginator
                    currentPage={Math.floor(desdeUsuarios / limite) + 1}
                    totalPages={Math.ceil(totalUsuarios / limite)}
                    onPageChange={(page) => setDesdeUsuarios((page - 1) * limite)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="productos" selected={selectedTab}>
            <div className="space-y-6">
              {/* Product Search */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6">
                <form onSubmit={handleBuscarProducto} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar producto por nombre"
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                      value={busquedaProducto}
                      onChange={(e) => setBusquedaProducto(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    Buscar
                  </button>
                </form>
              </div>

              {/* Create Product Form */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <PlusIcon className="h-5 w-5 text-indigo-400" />
                  Crear nuevo producto
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={nuevoProducto.descripcion}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Categoría"
                    value={nuevoProducto.categoria}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Precio"
                    value={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number.parseFloat(e.target.value) })}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  />

                  {/* Images Section */}
                  <div className="col-span-full">
                    <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <PhotoIcon className="h-4 w-4 text-indigo-400" />
                      Imágenes (URLs)
                    </label>
                    <div className="space-y-3">
                      {nuevoProducto.imagenes.map((img, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`URL imagen ${index + 1}`}
                            value={img}
                            onChange={(e) => {
                              const nuevasImagenes = [...nuevoProducto.imagenes]
                              nuevasImagenes[index] = e.target.value
                              setNuevoProducto({ ...nuevoProducto, imagenes: nuevasImagenes })
                            }}
                            className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const nuevasImagenes = [...nuevoProducto.imagenes]
                              nuevasImagenes.splice(index, 1)
                              setNuevoProducto({ ...nuevoProducto, imagenes: nuevasImagenes })
                            }}
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setNuevoProducto({ ...nuevoProducto, imagenes: [...nuevoProducto.imagenes, ""] })
                        }
                        className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Agregar imagen
                      </button>
                    </div>
                  </div>

                  {/* Sizes Section */}
                  <div className="col-span-full">
                    <label className="block text-sm font-semibold text-white mb-3">Talles y Stock</label>
                    <div className="space-y-3">
                      {nuevoProducto.talles.map((talle, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Talle (ej: S, M, L)"
                            value={talle.talle}
                            onChange={(e) => {
                              const nuevosTalles = [...nuevoProducto.talles]
                              nuevosTalles[index].talle = e.target.value
                              setNuevoProducto({ ...nuevoProducto, talles: nuevosTalles })
                            }}
                            className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                          />
                          <input
                            type="number"
                            placeholder="Stock"
                            value={talle.stock}
                            onChange={(e) => {
                              const nuevosTalles = [...nuevoProducto.talles]
                              nuevosTalles[index].stock = Number.parseInt(e.target.value) || 0
                              setNuevoProducto({ ...nuevoProducto, talles: nuevosTalles })
                            }}
                            className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const nuevosTalles = [...nuevoProducto.talles]
                              nuevosTalles.splice(index, 1)
                              setNuevoProducto({ ...nuevoProducto, talles: nuevosTalles })
                            }}
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setNuevoProducto({
                            ...nuevoProducto,
                            talles: [...nuevoProducto.talles, { talle: "", stock: 0 }],
                          })
                        }
                        className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Agregar talle
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={crearProducto}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Crear producto
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Squares2X2Icon className="h-5 w-5 text-indigo-400" />
                    Todos los productos ({totalProductos})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Categoría
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Talles/Stock
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Imágenes
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Destacado
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {productos.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-750 transition-colors duration-200">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            {editandoProductoId === p._id ? (
                              <input
                                value={productoEditado.nombre || p.nombre}
                                onChange={(e) =>
                                  setProductoEditado({
                                    ...productoEditado,
                                    nombre: e.target.value,
                                  })
                                }
                                className="bg-gray-700 border border-gray-600 text-white rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <div className="text-sm font-medium text-white">{p.nombre}</div>
                            )}
                          </td>

                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            {editandoProductoId === p._id ? (
                              <input
                                value={productoEditado.categoria || p.categoria}
                                onChange={(e) =>
                                  setProductoEditado({
                                    ...productoEditado,
                                    categoria: e.target.value,
                                  })
                                }
                                className="bg-gray-700 border border-gray-600 text-white rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium bg-indigo-900 text-indigo-200 rounded-full">
                                {p.categoria}
                              </span>
                            )}
                          </td>

                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            {editandoProductoId === p._id ? (
                              <input
                                type="number"
                                value={productoEditado.precio || p.precio}
                                onChange={(e) =>
                                  setProductoEditado({
                                    ...productoEditado,
                                    precio: e.target.value,
                                  })
                                }
                                className="bg-gray-700 border border-gray-600 text-white rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <div className="text-sm font-semibold text-white">${p.precio.toFixed(2)}</div>
                            )}
                          </td>

                          <td className="px-4 sm:px-6 py-4">
                            {editandoProductoId === p._id ? (
                              <div className="space-y-2 max-w-xs">
                                {(productoEditado.talles || p.talles).map((talle, index) => (
                                  <div key={index} className="flex gap-1">
                                    <input
                                      type="text"
                                      value={talle.talle}
                                      onChange={(e) => {
                                        const nuevosTalles = [...(productoEditado.talles || p.talles)]
                                        nuevosTalles[index].talle = e.target.value
                                        setProductoEditado({
                                          ...productoEditado,
                                          talles: nuevosTalles,
                                        })
                                      }}
                                      className="bg-gray-700 border border-gray-600 text-white rounded px-1 py-1 text-xs w-12 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <input
                                      type="number"
                                      value={talle.stock}
                                      onChange={(e) => {
                                        const nuevosTalles = [...(productoEditado.talles || p.talles)]
                                        nuevosTalles[index].stock = Number.parseInt(e.target.value) || 0
                                        setProductoEditado({
                                          ...productoEditado,
                                          talles: nuevosTalles,
                                        })
                                      }}
                                      className="bg-gray-700 border border-gray-600 text-white rounded px-1 py-1 text-xs w-12 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <button
                                      onClick={() => {
                                        const nuevosTalles = [...(productoEditado.talles || p.talles)]
                                        nuevosTalles.splice(index, 1)
                                        setProductoEditado({
                                          ...productoEditado,
                                          talles: nuevosTalles,
                                        })
                                      }}
                                      className="text-red-400 text-xs hover:text-red-300"
                                    >
                                      <XMarkIcon className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => {
                                    setProductoEditado({
                                      ...productoEditado,
                                      talles: [...(productoEditado.talles || p.talles), { talle: "", stock: 0 }],
                                    })
                                  }}
                                  className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 text-gray-300"
                                >
                                  + Agregar
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                {p.talles.map((talle, index) => (
                                  <div key={index} className="text-xs">
                                    <span className="font-medium text-white">{talle.talle}:</span>{" "}
                                    <span
                                      className={`${talle.stock > 0 ? "text-green-400" : "text-red-400"} font-medium`}
                                    >
                                      {talle.stock}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>

                          <td className="px-4 sm:px-6 py-4">
                            {editandoProductoId === p._id ? (
                              <div className="space-y-2 max-w-xs">
                                {(productoEditado.imagenes || p.imagenes).map((img, index) => (
                                  <div key={index} className="flex gap-1">
                                    <input
                                      type="text"
                                      value={img}
                                      onChange={(e) => {
                                        const nuevasImagenes = [...(productoEditado.imagenes || p.imagenes)]
                                        nuevasImagenes[index] = e.target.value
                                        setProductoEditado({
                                          ...productoEditado,
                                          imagenes: nuevasImagenes,
                                        })
                                      }}
                                      className="bg-gray-700 border border-gray-600 text-white rounded px-1 py-1 text-xs flex-grow focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <button
                                      onClick={() => {
                                        const nuevasImagenes = [...(productoEditado.imagenes || p.imagenes)]
                                        nuevasImagenes.splice(index, 1)
                                        setProductoEditado({
                                          ...productoEditado,
                                          imagenes: nuevasImagenes,
                                        })
                                      }}
                                      className="text-red-400 text-xs hover:text-red-300"
                                    >
                                      <XMarkIcon className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => {
                                    setProductoEditado({
                                      ...productoEditado,
                                      imagenes: [...(productoEditado.imagenes || p.imagenes), ""],
                                    })
                                  }}
                                  className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 text-gray-300"
                                >
                                  + Agregar
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {p.imagenes.slice(0, 3).map((img, index) => (
                                  <img
                                    key={index}
                                    src={img || "/placeholder.svg"}
                                    alt={`Imagen ${index + 1}`}
                                    className="w-8 h-8 object-cover rounded border border-gray-600"
                                    onError={(e) => {
                                      e.target.src = "https://via.placeholder.com/32"
                                    }}
                                  />
                                ))}
                                {p.imagenes.length > 3 && (
                                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-xs font-medium text-gray-400">
                                    +{p.imagenes.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>

                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                p.activo ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
                              }`}
                            >
                              {p.activo ? "Activo" : "Inactivo"}
                            </span>
                          </td>

                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleDestacado(p._id, p.destacado)}
                              className="hover:scale-110 transition-transform duration-200"
                            >
                              <StarIcon
                                className={`w-5 h-5 ${p.destacado ? "text-yellow-400 fill-current" : "text-gray-500"}`}
                              />
                            </button>
                          </td>

                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              {editandoProductoId === p._id ? (
                                <>
                                  <button
                                    onClick={() => actualizarProducto(p._id)}
                                    className="text-green-400 hover:text-green-300 hover:bg-green-900/20 p-1 rounded transition-colors duration-200"
                                  >
                                    <CheckIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditandoProductoId(null)}
                                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-700 p-1 rounded transition-colors duration-200"
                                  >
                                    <XMarkIcon className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditandoProductoId(p._id)
                                      setProductoEditado({
                                        nombre: p.nombre,
                                        categoria: p.categoria,
                                        precio: p.precio,
                                        talles: [...p.talles],
                                        imagenes: [...p.imagenes],
                                      })
                                    }}
                                    className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/20 p-1 rounded transition-colors duration-200"
                                  >
                                    <PencilSquareIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => eliminarProducto(p._id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1 rounded transition-colors duration-200"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 sm:px-6 py-4 border-t border-gray-700">
                  <Paginator
                    currentPage={Math.floor(desdeProductos / limite) + 1}
                    totalPages={Math.ceil(totalProductos / limite)}
                    onPageChange={(page) => setDesdeProductos((page - 1) * limite)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categorias" selected={selectedTab}>
            <div className="space-y-6">
              {/* Create Category */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <PlusIcon className="h-5 w-5 text-indigo-400" />
                  Crear nueva categoría
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                  />
                  <button
                    onClick={crearCategoria}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Crear
                  </button>
                </div>
              </div>

              {/* Categories Table */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TagIcon className="h-5 w-5 text-indigo-400" />
                    Categorías existentes ({categorias.length})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {categorias.map((c) => (
                        <tr key={c._id} className="hover:bg-gray-750 transition-colors duration-200">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            {editandoCategoriaId === c._id ? (
                              <input
                                value={categoriaEditada}
                                onChange={(e) => setCategoriaEditada(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            ) : (
                              <div className="text-sm font-medium text-white">{c.categoria}</div>
                            )}
                          </td>

                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              {editandoCategoriaId === c._id ? (
                                <>
                                  <button
                                    onClick={() => actualizarCategoria(c._id)}
                                    className="text-green-400 hover:text-green-300 hover:bg-green-900/20 p-1 rounded transition-colors duration-200"
                                  >
                                    <CheckIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditandoCategoriaId(null)}
                                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-700 p-1 rounded transition-colors duration-200"
                                  >
                                    <XMarkIcon className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditandoCategoriaId(c._id)
                                      setCategoriaEditada(c.categoria)
                                    }}
                                    className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/20 p-1 rounded transition-colors duration-200"
                                  >
                                    <PencilSquareIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => eliminarCategoria(c._id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1 rounded transition-colors duration-200"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ordenes" selected={selectedTab}>
            <div className="space-y-6">
              {/* Orders Table */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <ShoppingBagIcon className="h-5 w-5 text-indigo-400" />
                    Todas las órdenes ({totalOrdenes})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Productos
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {ordenes.map((orden) => {
                        const estado = getEstadoOrden(orden.estado_pago)
                        const EstadoIcono = estado.icono
                        return (
                          <tr key={orden._id} className="hover:bg-gray-750 transition-colors duration-200">
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {orden._id.substring(18, 24).toUpperCase()}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-white font-medium">
                                {orden.comprador?.email || "No disponible"}
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <div className="space-y-1">
                                {orden.productos.map((producto, index) => (
                                  <div key={index} className="text-sm text-white">
                                    <span className="font-medium">{producto.titulo}</span>
                                    <span className="text-gray-400 ml-2">
                                      (Talle: {producto.talle}, Cant: {producto.cantidad})
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-white">
                                $
                                {orden.productos
                                  .reduce((total, prod) => total + prod.precio_unitario * prod.cantidad, 0)
                                  .toFixed(2)}
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${estado.color}`}
                              >
                                <EstadoIcono className="h-3 w-3 mr-1" />
                                {estado.texto}
                              </span>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {new Date(orden.creadoEn).toLocaleDateString()}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 sm:px-6 py-4 border-t border-gray-700">
                  <Paginator
                    currentPage={Math.floor(desdeOrdenes / limite) + 1}
                    totalPages={Math.ceil(totalOrdenes / limite)}
                    onPageChange={(page) => setDesdeOrdenes((page - 1) * limite)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminPage
