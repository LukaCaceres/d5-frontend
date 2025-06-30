import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
    <div className="p-4 max-w-7xl mx-auto h-screen mb-6">
      <h2 className="text-3xl font-semibold mb-4">
        Resultados de búsqueda para: <span className="text-indigo-800">"{query}"</span>
      </h2>

      {productos.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="text-gray-500">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ResultadosPage;
