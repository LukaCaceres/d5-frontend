import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const carouselImages = [
    {
        src: 'https://i.postimg.cc/ZYr3Y2mp/d5-banner.jpg',
        alt: 'Bienvenido a la tienda',
    },
    {
        src: 'https://i.postimg.cc/zvSRdb70/d5paga.jpg',
        alt: 'Paga como quieras',
    },
    {
        src: 'https://i.postimg.cc/tJHxtt3s/d5yamal.jpg',
        alt: 'Envios a todo el pais',
    },
];

const HomePage = () => {
    const [destacados, setDestacados] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestacados = async () => {
            try {
                const res = await axios.get('https://doble-cinco-backend.onrender.com/api/producto/destacados');
                setDestacados(res.data.productos.slice(0, 4));
            } catch (error) {
                console.error('Error al cargar productos destacados:', error);
            }
        };
        fetchDestacados();
    }, []);

    const goToSlide = (index) => {
        const lastIndex = carouselImages.length - 1;
        if (index < 0) setCurrentSlide(lastIndex);
        else if (index > lastIndex) setCurrentSlide(0);
        else setCurrentSlide(index);
    };

    const startAutoSlide = () => {
        slideInterval.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
    };

    const stopAutoSlide = () => {
        if (slideInterval.current) clearInterval(slideInterval.current);
    };

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, []);

    return (
        <div className="space-y-20 px-4 sm:px-6 lg:px-8">
            {/* Carrusel */}
            <div
                className="relative max-w-7xl mx-auto overflow-hidden rounded-lg"
                onMouseEnter={stopAutoSlide}
                onMouseLeave={startAutoSlide}
            >
                {/* Slides */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {carouselImages.map(({ src, alt }, i) => (
                        <div key={i} className="w-full flex-shrink-0">
                            {/* Pantallas grandes */}
                            <img
                                src={src}
                                alt={alt}
                                className="hidden lg:block w-full h-[400px] object-cover"
                            />

                            {/* Pantallas chicas */}
                            <img
                                src={src}
                                alt={alt}
                                className="block lg:hidden w-full h-auto max-h-[300px] object-contain mx-auto"
                            />
                        </div>
                    ))}
                </div>


                {/* Botones prev/next */}
                <button
                    onClick={() => {
                        stopAutoSlide();
                        goToSlide(currentSlide - 1);
                    }}
                    className="cursor-pointer absolute top-1/2 left-3 sm:left-6 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition focus:outline-none"
                    aria-label="Slide anterior"
                >
                    ‹
                </button>
                <button
                    onClick={() => {
                        stopAutoSlide();
                        goToSlide(currentSlide + 1);
                    }}
                    className="cursor-pointer absolute top-1/2 right-3 sm:right-6 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition focus:outline-none"
                    aria-label="Siguiente slide"
                >
                    ›
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 ">
                    {carouselImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                stopAutoSlide();
                                goToSlide(i);
                            }}
                            className={`w-3 h-3 rounded-full cursor-pointer ${i === currentSlide ? 'bg-indigo-700' : 'bg-gray-300'
                                } focus:outline-none`}
                            aria-label={`Ir al slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Productos Destacados */}
            <section className="max-w-6xl mx-auto px-2 sm:px-0">
                <h2 className="text-3xl font-bold text-center mb-8">Productos Destacados</h2>
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
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/productos')}
                        className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded text-sm"
                    >
                        Ver todos los productos
                    </button>
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="bg-gray-50 py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg text-indigo-700">¿Hacen envíos a todo el país?</h3>
                            <p className="text-gray-700">
                                Sí, realizamos envíos a toda la Argentina. Para más detalles comunicate con nosotros mediante Whatsapp o Instagram antes de realizar la compra para que podamos ayudarte.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-indigo-700">¿Puedo cambiar o devolver un producto?</h3>
                            <p className="text-gray-700">
                                Aceptamos cambios hasta 5 días hábiles después de la compra. El producto debe estar sin uso y con etiquetas, junto con su bolsa en el mismo estado. No aceptamos devoluciones ni reembolsamos dinero.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-indigo-700">¿Cómo puedo pagar?</h3>
                            <p className="text-gray-700">
                                Podes hacerlo mediante la web con tarjetas de débito/crédito, Mercado Pago, y transferencias bancarias. Sino, de forma presencial con los mismos medios de pago o efectivo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cómo saber tu talle */}

            <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
                <h2 className="text-3xl font-bold text-center">¿No sabés qué talle sos?</h2>
                <p className="text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                    Para elegir el talle correcto, te recomendamos medir una prenda tuya que te quede bien y compararla con nuestra guía. Recorda que las medidas son aproximadas y para adultos.
                </p>
                <p className="text-gray-700 leading-relaxed text-center max-w-2xl mx-auto mb-6">
                    Si estás entre dos talles, te sugerimos elegir el más grande. Y si tenés dudas, ¡escribinos por Instagram o Whatsapp y te ayudamos!
                </p>

                {/* Tabla de talles */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center border border-gray-300">
                        <thead className="bg-indigo-700 text-white">
                            <tr>
                                <th className="py-2 px-4 border">Talle</th>
                                <th className="py-2 px-4 border">Pecho (cm)</th>
                                <th className="py-2 px-4 border">Largo (cm)</th>
                                <th className="py-2 px-4 border">Mangas (cm)</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr>
                                <td className="py-2 px-4 border">S</td>
                                <td className="py-2 px-4 border">49</td>
                                <td className="py-2 px-4 border">70</td>
                                <td className="py-2 px-4 border">23</td>

                            </tr>
                            <tr>
                                <td className="py-2 px-4 border">M</td>
                                <td className="py-2 px-4 border">51</td>
                                <td className="py-2 px-4 border">71</td>
                                <td className="py-2 px-4 border">23,5</td>

                            </tr>
                            <tr>
                                <td className="py-2 px-4 border">L</td>
                                <td className="py-2 px-4 border">52</td>
                                <td className="py-2 px-4 border">73</td>
                                <td className="py-2 px-4 border">24,5</td>

                            </tr>
                            <tr>
                                <td className="py-2 px-4 border">XL</td>
                                <td className="py-2 px-4 border">53</td>
                                <td className="py-2 px-4 border">75</td>
                                <td className="py-2 px-4 border">25</td>

                            </tr>
                            <tr>
                                <td className="py-2 px-4 border">XXL</td>
                                <td className="py-2 px-4 border">54</td>
                                <td className="py-2 px-4 border">77</td>
                                <td className="py-2 px-4 border">26,5</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
