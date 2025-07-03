"use client"

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import Paginator from '../components/Paginator';

const ResultadosPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const token = localStorage.getItem('token');

  const fetchProductos = async () => {
    try {
      const offset = (currentPage - 1) * limit;
      const res = await axios.get('https://doble-cinco-backend.onrender.com/api/producto', {
        params: {
          query,
          limite: limit,
          desde: offset,
        },
      });
      setProductos(res.data.productos);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [query, currentPage]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3 mb-2">
            <MagnifyingGlassIcon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
            Resultados de búsqueda
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            para: <span className="text-indigo-400 font-semibold">"{query}"</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {total > 0 ? `${total} productos encontrados` : 'No se encontraron productos'}
          </p>
        </div>

        {productos.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Products Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productos.map((producto) => (
                <ProductCard
                  key={producto._id}
                  id={producto._id}
                  title={producto.nombre}
                  price={producto.precio}
                  image={producto.imagenes?.[0]}
                  token={token}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-4 sm:pt-6">
                <Paginator
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <ExclamationTriangleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              No se encontraron productos
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
              No hay productos que coincidan con tu búsqueda "{query}". 
              Intenta con otros términos o explora nuestras categorías.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                ← Volver atrás
              </button>
              <button
                onClick={() => window.location.href = '/productos'}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Ver todos los productos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultadosPage;
