import React, { useState } from 'react';
import axios from 'axios';

const RegistroPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    const { nombre, correo, password, confirmPassword } = formData;

    if (!nombre || !correo || !password || !confirmPassword) {
      return setError('Todos los campos son obligatorios.');
    }

    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }

    try {
      const { data } = await axios.post('https://doble-cinco-backend.onrender.com/api/usuario', {
        nombre,
        correo,
        password,
      });
      setMensaje('Usuario registrado correctamente.');
      setFormData({
        nombre: '',
        correo: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      const msg = err.response?.data?.msg || 'Error al registrar usuario.';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Formulario */}
      <div className="flex flex-col justify-center items-center px-8 py-12 bg-white">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
          >
            Registrar
          </button>
        </form>
      </div>

      {/* Imagen */}
      <div className="hidden lg:block">
        <img
          src="https://i.postimg.cc/Y0smmwSz/zidane.jpg"
          alt="Zidane jugando fútbol"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegistroPage;
