import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, title, price, image, token }) => {
  const navigate = useNavigate();


  const goToProductPage = () => navigate(`/producto/${id}`);

  return (
    <div
      onClick={goToProductPage}
      className="bg-white rounded-lg shadow-md border border-indigo-900 p-4 hover:shadow-lg transition cursor-pointer"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 rounded-md mb-3">
        <img
          src={image || '/placeholder.webp'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-indigo-900 line-clamp-2">{title}</h3>
          <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goToProductPage();
        }}
        className="w-full bg-indigo-900 hover:bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium transition cursor-pointer"
      >
        Ver producto
      </button>
    </div>
  );
};

export default ProductCard;
