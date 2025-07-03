"use client"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import ProductCard from "../components/ProductCard"

const carouselImages = [
    {
        src: "https://i.postimg.cc/ZYr3Y2mp/d5-banner.jpg",
        alt: "Bienvenido a la tienda",
    },
    {
        src: "https://i.postimg.cc/zvSRdb70/d5paga.jpg",
        alt: "Paga como quieras",
    },
    {
        src: "https://i.postimg.cc/tJHxtt3s/d5yamal.jpg",
        alt: "Envios a todo el pais",
    },
]

const HomePage = () => {
    const [destacados, setDestacados] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const slideInterval = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDestacados = async () => {
            try {
                const res = await axios.get("https://doble-cinco-backend.onrender.com/api/producto/destacados")
                setDestacados(res.data.productos.slice(0, 4))
            } catch (error) {
                console.error("Error al cargar productos destacados:", error)
            }
        }

        fetchDestacados()
    }, [])

    const goToSlide = (index) => {
        const lastIndex = carouselImages.length - 1
        if (index < 0) setCurrentSlide(lastIndex)
        else if (index > lastIndex) setCurrentSlide(0)
        else setCurrentSlide(index)
    }

    const startAutoSlide = () => {
        slideInterval.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
        }, 5000)
    }

    const stopAutoSlide = () => {
        if (slideInterval.current) clearInterval(slideInterval.current)
    }

    useEffect(() => {
        startAutoSlide()
        return () => stopAutoSlide()
    }, [])

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="space-y-20 px-4 sm:px-6 lg:px-8">
                {/* Carousel */}
                <div
                    className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-2xl"
                    onMouseEnter={stopAutoSlide}
                    onMouseLeave={startAutoSlide}
                >
                    {/* Slides */}
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {carouselImages.map(({ src, alt }, i) => (
                            <div key={i} className="w-full flex-shrink-0 relative">
                                {/* Large screens */}
                                <img
                                    src={src || "/placeholder.svg"}
                                    alt={alt}
                                    className="hidden lg:block w-full h-[400px] object-cover"
                                />
                                {/* Small screens */}
                                <img
                                    src={src || "/placeholder.svg"}
                                    alt={alt}
                                    className="block lg:hidden w-full h-auto max-h-[300px] object-contain mx-auto"
                                />
                                {/* Overlay for better button visibility */}
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={() => {
                            stopAutoSlide()
                            goToSlide(currentSlide - 1)
                        }}
                        className="absolute top-1/2 left-3 sm:left-6 transform -translate-y-1/2 bg-gray-900/70 backdrop-blur-sm text-white rounded-full p-3 hover:bg-gray-900/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Slide anterior"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => {
                            stopAutoSlide()
                            goToSlide(currentSlide + 1)
                        }}
                        className="absolute top-1/2 right-3 sm:right-6 transform -translate-y-1/2 bg-gray-900/70 backdrop-blur-sm text-white rounded-full p-3 hover:bg-gray-900/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Siguiente slide"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        {carouselImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    stopAutoSlide()
                                    goToSlide(i)
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${i === currentSlide ? "bg-indigo-500 scale-125" : "bg-white/50 hover:bg-white/70"
                                    } focus:outline-none`}
                                aria-label={`Ir al slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Featured Products */}
                <section className="max-w-6xl mx-auto px-2 sm:px-0">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <StarIcon className="h-8 w-8 text-indigo-500" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">Productos Destacados</h2>
                            <StarIcon className="h-8 w-8 text-indigo-500" />
                        </div>
                        <p className="text-gray-400 text-lg">Descubre nuestros productos más populares</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {destacados.map((producto) => (
                            <ProductCard
                                key={producto._id}
                                id={producto._id}
                                title={producto.nombre}
                                price={producto.precio}
                                image={producto.imagenes?.[0]}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate("/productos")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Ver todos los productos
                        </button>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-gray-800/50 backdrop-blur-sm py-16 px-4 sm:px-6 rounded-2xl border border-gray-700">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <QuestionMarkCircleIcon className="h-8 w-8 text-indigo-500" />
                                <h2 className="text-3xl sm:text-4xl font-bold text-white">Preguntas Frecuentes</h2>
                            </div>
                            <p className="text-gray-400 text-lg">Todo lo que necesitas saber</p>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                <h3 className="font-semibold text-xl text-indigo-400 mb-3">¿Hacen envíos a todo el país?</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Sí, realizamos envíos a toda la Argentina. Para más detalles comunicate con nosotros mediante Whatsapp
                                    o Instagram antes de realizar la compra para que podamos ayudarte.
                                </p>
                            </div>

                            <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                <h3 className="font-semibold text-xl text-indigo-400 mb-3">¿Puedo cambiar o devolver un producto?</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Aceptamos cambios hasta 5 días hábiles después de la compra. El producto debe estar sin uso y con
                                    etiquetas, junto con su bolsa en el mismo estado. No aceptamos devoluciones ni reembolsamos dinero.
                                </p>
                            </div>

                            <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                <h3 className="font-semibold text-xl text-indigo-400 mb-3">¿Cómo puedo pagar?</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Podes hacerlo mediante la web con tarjetas de débito/crédito, Mercado Pago, y transferencias
                                    bancarias. Sino, de forma presencial con los mismos medios de pago o efectivo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Size Guide */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">¿No sabés qué talle sos?</h2>
                        <div className="max-w-3xl mx-auto space-y-4">
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Para elegir el talle correcto, te recomendamos medir una prenda tuya que te quede bien y compararla con
                                nuestra guía. Recorda que las medidas son aproximadas y para adultos.
                            </p>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Si estás entre dos talles, te sugerimos elegir el más grande. Y si tenés dudas, ¡escribinos por
                                Instagram o Whatsapp y te ayudamos!
                            </p>
                        </div>
                    </div>

                    {/* Size Table */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-center">
                                <thead className="bg-indigo-600">
                                    <tr>
                                        <th className="py-4 px-6 text-white font-semibold">Talle</th>
                                        <th className="py-4 px-6 text-white font-semibold">Pecho (cm)</th>
                                        <th className="py-4 px-6 text-white font-semibold">Largo (cm)</th>
                                        <th className="py-4 px-6 text-white font-semibold">Mangas (cm)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300">
                                    {[
                                        { talle: "S", pecho: "49", largo: "70", mangas: "23" },
                                        { talle: "M", pecho: "51", largo: "71", mangas: "23,5" },
                                        { talle: "L", pecho: "52", largo: "73", mangas: "24,5" },
                                        { talle: "XL", pecho: "53", largo: "75", mangas: "25" },
                                        { talle: "XXL", pecho: "54", largo: "77", mangas: "26,5" },
                                    ].map((row, index) => (
                                        <tr
                                            key={row.talle}
                                            className={`${index % 2 === 0 ? "bg-gray-700/30" : "bg-gray-700/50"} hover:bg-gray-600/50 transition-colors duration-200`}
                                        >
                                            <td className="py-4 px-6 font-semibold text-indigo-400">{row.talle}</td>
                                            <td className="py-4 px-6">{row.pecho}</td>
                                            <td className="py-4 px-6">{row.largo}</td>
                                            <td className="py-4 px-6">{row.mangas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HomePage
