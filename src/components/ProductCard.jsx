"use client"
import { ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ id, title, price, image, token }) => {
    const navigate = useNavigate()
    const goToProductPage = () => navigate(`/producto/${id}`)

    return (
        <div className="group bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer">
            {/* Image Container */}
            <div onClick={goToProductPage} className="aspect-square overflow-hidden bg-gray-700 rounded-t-xl">
                <img
                    src={image || "/placeholder.webp"}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 md:p-5">
                {/* Product Info */}
                <div className="mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white line-clamp-2 mb-2 group-hover:text-indigo-400 transition-colors duration-200">
                        {title}
                    </h3>
                    <div className="flex items-center justify-between">
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-400">${price.toFixed(2)}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <ShoppingCartIcon className="h-3 w-3" />
                            <span className="hidden sm:inline">Disponible</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        goToProductPage()
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group/btn"
                >
                    <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                    <span className="hidden sm:inline">Ver producto</span>
                    <span className="sm:hidden">Ver</span>
                </button>
            </div>
        </div>
    )
}

export default ProductCard
