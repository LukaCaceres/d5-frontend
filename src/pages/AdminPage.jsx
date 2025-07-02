"use client";
import Paginator from "../components/Paginator";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    TrashIcon,
    PencilSquareIcon,
    CheckIcon,
    XMarkIcon,
    StarIcon,
    PlusIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

const Tabs = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => (
    <div className="flex space-x-2 border-b mb-6">{children}</div>
);
const TabsTrigger = ({ value, selected, onClick, children }) => (
    <button
        onClick={() => onClick(value)}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${selected === value
            ? "border-indigo-600 text-indigo-600"
            : "border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-400"
            }`}
    >
        {children}
    </button>
);
const TabsContent = ({ value, selected, children }) => {
    if (value !== selected) return null;
    return <div>{children}</div>;
};

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState("usuarios");
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioBuscado, setUsuarioBuscado] = useState(null);
    const [busquedaId, setBusquedaId] = useState("");

    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState("");
    const [editandoCategoriaId, setEditandoCategoriaId] = useState(null);
    const [categoriaEditada, setCategoriaEditada] = useState("");

    const [productos, setProductos] = useState([]);
    const [editandoProductoId, setEditandoProductoId] = useState(null);
    const [productoEditado, setProductoEditado] = useState({});
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: 0,
        imagenes: [""], // Inicia con un campo vacío
        talles: [{ talle: "", stock: 0 }] // Inicia con un campo vacío
    });
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [desdeProductos, setDesdeProductos] = useState(0);
    const [desdeUsuarios, setDesdeUsuarios] = useState(0);
    const [busquedaProducto, setBusquedaProducto] = useState("");
    const limite = 10;
    const token = localStorage.getItem("token");

    const fetchUsuarios = async () => {
        try {
            const res = await axios.get(
                `https://doble-cinco-backend.onrender.com/api/usuario?desde=${desdeUsuarios}&limite=${limite}`,
                { headers: { "x-token": token } }
            );
            setUsuarios(res.data.usuarios || []);
            setTotalUsuarios(res.data.total || 0);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
        }
    };

    const buscarUsuarioPorId = async () => {
        try {
            const res = await axios.get(
                `https://doble-cinco-backend.onrender.com/api/usuario/${busquedaId}`,
                {
                    headers: { "x-token": token },
                }
            );
            setUsuarioBuscado(res.data);
        } catch (err) {
            console.error("Usuario no encontrado:", err);
            setUsuarioBuscado(null);
        }
    };

    const fetchCategorias = async () => {
        try {
            const res = await axios.get(
                "https://doble-cinco-backend.onrender.com/api/categoria"
            );
            setCategorias(res.data.categorias || []);
        } catch (err) {
            console.error("Error al obtener categorías:", err);
        }
    };

    const crearCategoria = async () => {
        try {
            await axios.post(
                "https://doble-cinco-backend.onrender.com/api/categoria",
                { categoria: nuevaCategoria },
                { headers: { "x-token": token } }
            );
            setNuevaCategoria("");
            fetchCategorias();
        } catch (err) {
            console.error("Error al crear categoría:", err);
        }
    };

    const actualizarCategoria = async (id) => {
        try {
            await axios.put(
                `https://doble-cinco-backend.onrender.com/api/categoria/${id}`,
                { categoria: categoriaEditada },
                { headers: { "x-token": token } }
            );
            setEditandoCategoriaId(null);
            setCategoriaEditada("");
            fetchCategorias();
        } catch (err) {
            console.error("Error al actualizar categoría:", err);
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            await axios.delete(
                `https://doble-cinco-backend.onrender.com/api/categoria/${id}`,
                { headers: { "x-token": token } }
            );
            fetchCategorias();
        } catch (err) {
            console.error("Error al eliminar categoría:", err);
        }
    };

    const fetchProductos = async () => {
        try {
            const url = busquedaProducto
                ? `https://doble-cinco-backend.onrender.com/api/producto?query=${encodeURIComponent(
                    busquedaProducto
                )}&desde=${desdeProductos}&limite=${limite}`
                : `https://doble-cinco-backend.onrender.com/api/producto?desde=${desdeProductos}&limite=${limite}`;

            const res = await axios.get(url);
            setProductos(res.data.productos || []);
            setTotalProductos(res.data.total || 0);
        } catch (err) {
            console.error("Error al obtener productos:", err);
        }
    };

    const actualizarProducto = async (id) => {
        try {
            await axios.put(
                `https://doble-cinco-backend.onrender.com/api/producto/${id}`,
                productoEditado,
                { headers: { "x-token": token } }
            );
            setEditandoProductoId(null);
            setProductoEditado({});
            fetchProductos();
        } catch (err) {
            console.error("Error al actualizar producto:", err);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.delete(
                `https://doble-cinco-backend.onrender.com/api/producto/${id}`,
                { headers: { "x-token": token } }
            );
            fetchProductos();
        } catch (err) {
            console.error("Error al eliminar producto:", err);
        }
    };

    const crearProducto = async () => {
        try {
            // Filtrar talles vacíos
            const productoAEnviar = {
                ...nuevoProducto,
                talles: nuevoProducto.talles.filter(t => t.talle.trim() !== ""),
                imagenes: nuevoProducto.imagenes.filter(img => img.trim() !== "")
            };

            await axios.post(
                "https://doble-cinco-backend.onrender.com/api/producto",
                productoAEnviar,
                { headers: { "x-token": token } }
            );

            setNuevoProducto({
                nombre: "",
                descripcion: "",
                categoria: "",
                precio: 0,
                imagenes: [""],
                talles: [{ talle: "", stock: 0 }]
            });
            fetchProductos();
        } catch (err) {
            console.error("Error al crear producto:", err);
        }
    };

    const toggleDestacado = async (id, actual) => {
        try {
            await axios.put(
                `https://doble-cinco-backend.onrender.com/api/producto/${id}/destacar`,
                { destacado: !actual },
                { headers: { "x-token": token } }
            );
            fetchProductos();
        } catch (err) {
            console.error("Error al destacar producto:", err);
        }
    };

    const handleBuscarProducto = (e) => {
        e.preventDefault();
        setDesdeProductos(0); // Resetear a la primera página al realizar una nueva búsqueda
        fetchProductos();
    };

    useEffect(() => {
        fetchUsuarios();
        fetchCategorias();
        fetchProductos();
    }, [desdeProductos, desdeUsuarios]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Panel de Administración
            </h1>
            <Tabs>
                <TabsList>
                    <TabsTrigger
                        value="productos"
                        selected={selectedTab}
                        onClick={setSelectedTab}
                    >
                        Productos
                    </TabsTrigger>
                    <TabsTrigger
                        value="categorias"
                        selected={selectedTab}
                        onClick={setSelectedTab}
                    >
                        Categorías
                    </TabsTrigger>
                    <TabsTrigger
                        value="usuarios"
                        selected={selectedTab}
                        onClick={setSelectedTab}
                    >
                        Usuarios
                    </TabsTrigger>
                    <TabsTrigger
                        value="ordenes"
                        selected={selectedTab}
                        onClick={setSelectedTab}
                    >
                        Órdenes
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="usuarios" selected={selectedTab}>
                    <div className="space-y-4">
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Buscar usuario por ID"
                                className="border border-gray-300 rounded px-3 py-2 text-sm w-full max-w-md"
                                value={busquedaId}
                                onChange={(e) => setBusquedaId(e.target.value)}
                            />
                            <button
                                onClick={buscarUsuarioPorId}
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            >
                                Buscar
                            </button>
                        </div>
                        {usuarioBuscado && (
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded shadow">
                                <p>
                                    <strong>Nombre:</strong> {usuarioBuscado.nombre}
                                </p>
                                <p>
                                    <strong>Correo:</strong> {usuarioBuscado.correo}
                                </p>
                                <p>
                                    <strong>Rol:</strong> {usuarioBuscado.rol}
                                </p>
                            </div>
                        )}
                        <h2 className="text-xl font-bold mt-6 mb-2">Todos los usuarios</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Nombre</th>
                                        <th className="px-4 py-2">Correo</th>
                                        <th className="px-4 py-2">Rol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((u) => (
                                        <tr key={u.uid} className="border-b">
                                            <td className="px-4 py-2">{u.nombre}</td>
                                            <td className="px-4 py-2">{u.correo}</td>
                                            <td className="px-4 py-2">{u.rol}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginator
                                currentPage={Math.floor(desdeUsuarios / limite) + 1}
                                totalPages={Math.ceil(totalUsuarios / limite)}
                                onPageChange={(page) => setDesdeUsuarios((page - 1) * limite)}
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="productos" selected={selectedTab}>
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <form onSubmit={handleBuscarProducto} className="flex gap-2 items-center">
                                <div className="relative flex-grow max-w-md">
                                    <input
                                        type="text"
                                        placeholder="Buscar producto por nombre"
                                        className="border border-gray-300 rounded px-3 py-2 text-sm w-full pl-10"
                                        value={busquedaProducto}
                                        onChange={(e) => setBusquedaProducto(e.target.value)}
                                    />
                                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    Buscar
                                </button>
                            </form>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold mb-4">Crear nuevo producto</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={nuevoProducto.nombre}
                                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                                    className="border rounded px-3 py-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Descripción"
                                    value={nuevoProducto.descripcion}
                                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                                    className="border rounded px-3 py-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Categoría"
                                    value={nuevoProducto.categoria}
                                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
                                    className="border rounded px-3 py-2"
                                />
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={nuevoProducto.precio}
                                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat(e.target.value) })}
                                    className="border rounded px-3 py-2"
                                />

                                {/* Sección para imágenes */}
                                <div className="col-span-full">
                                    <label className="block font-medium mb-2">Imágenes (URLs)</label>
                                    {nuevoProducto.imagenes.map((img, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder={`URL imagen ${index + 1}`}
                                                value={img}
                                                onChange={(e) => {
                                                    const nuevasImagenes = [...nuevoProducto.imagenes];
                                                    nuevasImagenes[index] = e.target.value;
                                                    setNuevoProducto({ ...nuevoProducto, imagenes: nuevasImagenes });
                                                }}
                                                className="border rounded px-3 py-2 flex-grow"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const nuevasImagenes = [...nuevoProducto.imagenes];
                                                    nuevasImagenes.splice(index, 1);
                                                    setNuevoProducto({ ...nuevoProducto, imagenes: nuevasImagenes });
                                                }}
                                                className="bg-red-500 text-white px-3 py-2 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setNuevoProducto({ ...nuevoProducto, imagenes: [...nuevoProducto.imagenes, ""] })}
                                        className="mt-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
                                    >
                                        + Agregar imagen
                                    </button>
                                </div>

                                {/* Sección para talles y stock */}
                                <div className="col-span-full">
                                    <label className="block font-medium mb-2">Talles y Stock</label>
                                    {nuevoProducto.talles.map((talle, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Talle (ej: S, M, L)"
                                                value={talle.talle}
                                                onChange={(e) => {
                                                    const nuevosTalles = [...nuevoProducto.talles];
                                                    nuevosTalles[index].talle = e.target.value;
                                                    setNuevoProducto({ ...nuevoProducto, talles: nuevosTalles });
                                                }}
                                                className="border rounded px-3 py-2"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Stock"
                                                value={talle.stock}
                                                onChange={(e) => {
                                                    const nuevosTalles = [...nuevoProducto.talles];
                                                    nuevosTalles[index].stock = parseInt(e.target.value) || 0;
                                                    setNuevoProducto({ ...nuevoProducto, talles: nuevosTalles });
                                                }}
                                                className="border rounded px-3 py-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const nuevosTalles = [...nuevoProducto.talles];
                                                    nuevosTalles.splice(index, 1);
                                                    setNuevoProducto({ ...nuevoProducto, talles: nuevosTalles });
                                                }}
                                                className="bg-red-500 text-white px-3 py-2 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setNuevoProducto({ ...nuevoProducto, talles: [...nuevoProducto.talles, { talle: "", stock: 0 }] })}
                                        className="mt-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
                                    >
                                        + Agregar talle
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={crearProducto}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-2"
                            >
                                <PlusIcon className="w-4 h-4" /> Crear producto
                            </button>
                        </div>

                        <h2 className="text-xl font-bold">Todos los productos</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Nombre</th>
                                        <th className="px-4 py-2">Categoría</th>
                                        <th className="px-4 py-2">Precio</th>
                                        <th className="px-4 py-2">Talles/Stock</th>
                                        <th className="px-4 py-2">Imágenes</th>
                                        <th className="px-4 py-2">Activo</th>
                                        <th className="px-4 py-2">Destacado</th>
                                        <th className="px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((p) => (
                                        <tr key={p._id} className="border-b">
                                            <td className="px-4 py-2">
                                                {editandoProductoId === p._id ? (
                                                    <input
                                                        value={productoEditado.nombre || p.nombre}
                                                        onChange={(e) =>
                                                            setProductoEditado({
                                                                ...productoEditado,
                                                                nombre: e.target.value,
                                                            })
                                                        }
                                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                    />
                                                ) : (
                                                    p.nombre
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {editandoProductoId === p._id ? (
                                                    <input
                                                        value={productoEditado.categoria || p.categoria}
                                                        onChange={(e) =>
                                                            setProductoEditado({
                                                                ...productoEditado,
                                                                categoria: e.target.value,
                                                            })
                                                        }
                                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                    />
                                                ) : (
                                                    p.categoria
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
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
                                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                    />
                                                ) : (
                                                    `$${p.precio.toFixed(2)}`
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {editandoProductoId === p._id ? (
                                                    <div className="space-y-2">
                                                        {(productoEditado.talles || p.talles).map((talle, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={talle.talle}
                                                                    onChange={(e) => {
                                                                        const nuevosTalles = [...(productoEditado.talles || p.talles)];
                                                                        nuevosTalles[index].talle = e.target.value;
                                                                        setProductoEditado({
                                                                            ...productoEditado,
                                                                            talles: nuevosTalles,
                                                                        });
                                                                    }}
                                                                    className="border rounded px-2 py-1 text-sm w-16"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    value={talle.stock}
                                                                    onChange={(e) => {
                                                                        const nuevosTalles = [...(productoEditado.talles || p.talles)];
                                                                        nuevosTalles[index].stock = parseInt(e.target.value) || 0;
                                                                        setProductoEditado({
                                                                            ...productoEditado,
                                                                            talles: nuevosTalles,
                                                                        });
                                                                    }}
                                                                    className="border rounded px-2 py-1 text-sm w-16"
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        const nuevosTalles = [...(productoEditado.talles || p.talles)];
                                                                        nuevosTalles.splice(index, 1);
                                                                        setProductoEditado({
                                                                            ...productoEditado,
                                                                            talles: nuevosTalles,
                                                                        });
                                                                    }}
                                                                    className="text-red-500 text-sm"
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => {
                                                                setProductoEditado({
                                                                    ...productoEditado,
                                                                    talles: [...(productoEditado.talles || p.talles), { talle: "", stock: 0 }],
                                                                });
                                                            }}
                                                            className="text-xs bg-gray-200 px-2 py-1 rounded"
                                                        >
                                                            + Agregar talle
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1">
                                                        {p.talles.map((talle, index) => (
                                                            <div key={index} className="text-sm">
                                                                {talle.talle}: {talle.stock}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {editandoProductoId === p._id ? (
                                                    <div className="space-y-2">
                                                        {(productoEditado.imagenes || p.imagenes).map((img, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={img}
                                                                    onChange={(e) => {
                                                                        const nuevasImagenes = [...(productoEditado.imagenes || p.imagenes)];
                                                                        nuevasImagenes[index] = e.target.value;
                                                                        setProductoEditado({
                                                                            ...productoEditado,
                                                                            imagenes: nuevasImagenes,
                                                                        });
                                                                    }}
                                                                    className="border rounded px-2 py-1 text-sm flex-grow"
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        const nuevasImagenes = [...(productoEditado.imagenes || p.imagenes)];
                                                                        nuevasImagenes.splice(index, 1);
                                                                        setProductoEditado({
                                                                            ...productoEditado,
                                                                            imagenes: nuevasImagenes,
                                                                        });
                                                                    }}
                                                                    className="text-red-500 text-sm"
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => {
                                                                setProductoEditado({
                                                                    ...productoEditado,
                                                                    imagenes: [...(productoEditado.imagenes || p.imagenes), ""],
                                                                });
                                                            }}
                                                            className="text-xs bg-gray-200 px-2 py-1 rounded"
                                                        >
                                                            + Agregar imagen
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-wrap gap-1">
                                                        {p.imagenes.slice(0, 3).map((img, index) => (
                                                            <img
                                                                key={index}
                                                                src={img}
                                                                alt={`Imagen ${index + 1}`}
                                                                className="w-10 h-10 object-cover rounded"
                                                                onError={(e) => {
                                                                    e.target.src = "https://via.placeholder.com/40";
                                                                }}
                                                            />
                                                        ))}
                                                        {p.imagenes.length > 3 && (
                                                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xs">
                                                                +{p.imagenes.length - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">{p.activo ? "Sí" : "No"}</td>
                                            <td className="px-4 py-2">
                                                <button onClick={() => toggleDestacado(p._id, p.destacado)}>
                                                    <StarIcon
                                                        className={`w-5 h-5 ${p.destacado ? "text-yellow-500" : "text-gray-300"}`}
                                                    />
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 flex gap-2">
                                                {editandoProductoId === p._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => actualizarProducto(p._id)}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            <CheckIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditandoProductoId(null)}
                                                            className="text-gray-500 hover:text-gray-700"
                                                        >
                                                            <XMarkIcon className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                setEditandoProductoId(p._id);
                                                                setProductoEditado({
                                                                    nombre: p.nombre,
                                                                    categoria: p.categoria,
                                                                    precio: p.precio,
                                                                    talles: [...p.talles],
                                                                    imagenes: [...p.imagenes]
                                                                });
                                                            }}
                                                            className="text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            <PencilSquareIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => eliminarProducto(p._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginator
                                currentPage={Math.floor(desdeProductos / limite) + 1}
                                totalPages={Math.ceil(totalProductos / limite)}
                                onPageChange={(page) => setDesdeProductos((page - 1) * limite)}
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="categorias" selected={selectedTab}>
                    <div className="space-y-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Nueva categoría"
                                className="border border-gray-300 rounded px-3 py-2 text-sm w-full max-w-md"
                                value={nuevaCategoria}
                                onChange={(e) => setNuevaCategoria(e.target.value)}
                            />
                            <button
                                onClick={crearCategoria}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Crear
                            </button>
                        </div>

                        <h2 className="text-xl font-bold">Categorías existentes</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Nombre</th>
                                        <th className="px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((c) => (
                                        <tr key={c._id} className="border-b">
                                            <td className="px-4 py-2">
                                                {editandoCategoriaId === c._id ? (
                                                    <input
                                                        value={categoriaEditada}
                                                        onChange={(e) => setCategoriaEditada(e.target.value)}
                                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                    />
                                                ) : (
                                                    c.categoria
                                                )}
                                            </td>
                                            <td className="px-4 py-2 flex gap-2">
                                                {editandoCategoriaId === c._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => actualizarCategoria(c._id)}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            <CheckIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditandoCategoriaId(null)}
                                                            className="text-gray-500 hover:text-gray-700"
                                                        >
                                                            <XMarkIcon className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                setEditandoCategoriaId(c._id);
                                                                setCategoriaEditada(c.categoria);
                                                            }}
                                                            className="text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            <PencilSquareIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => eliminarCategoria(c._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="ordenes" selected={selectedTab}>
                    <p>Gestión de órdenes (por implementar).</p>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminPage;