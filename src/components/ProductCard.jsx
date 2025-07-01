"use client"
import { ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ id, title, price, image, token }) => {
    const navigate = useNavigate()
    const goToProductPage = () => navigate(`/producto/${id}`)

    return (
        <div className="group bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer">
            {/* Image Container */}
            <div onClick={goToProductPage} className="aspect-square overflow-hidden bg-gray-100 rounded-t-xl">
                <img
                    src={image || "/placeholder.webp"}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
                {/* Product Info */}
                <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-700 transition-colors duration-200">
                        {title}
                    </h3>
                    <div className="flex items-center justify-between">
                        <p className="text-xl sm:text-2xl font-bold text-indigo-600">${price.toFixed(2)}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <ShoppingCartIcon className="h-3 w-3" />
                            <span>Disponible</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        goToProductPage()
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group/btn"
                >
                    <EyeIcon className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                    Ver producto
                </button>
            </div>
        </div>
    )
}

export default ProductCard
