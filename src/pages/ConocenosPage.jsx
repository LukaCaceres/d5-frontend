import { MapPinIcon, HeartIcon, EyeIcon, StarIcon } from "@heroicons/react/24/outline"

const ConocenosPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
                {/* Título principal */}
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Conocenos</h1>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                        Somos más que una tienda de ropa: somos pasión por el deporte.
                    </p>
                </div>

                {/* Quiénes somos */}
                <section className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700">
                        <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
                            <HeartIcon className="h-6 w-6 text-indigo-500" />
                            ¿Quiénes somos?
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            Doble Cinco nació con la idea de llevar la pasión por el deporte a cada rincón del país. Desde nuestras
                            primeras camisetas hasta los últimos lanzamientos, buscamos que cada apasionado por el deporte pueda tener
                            la prenda que tanto desea.
                        </p>
                    </div>
                    <div className="hidden md:flex justify-center">
                        <div className="w-64 h-64 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center shadow-2xl">
                            <HeartIcon className="h-24 w-24 text-white" />
                        </div>
                    </div>
                </section>

                {/* Misión, Visión, Valores */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-center hover:bg-gray-750 transition-colors duration-200">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HeartIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-indigo-400 mb-3">Nuestra Misión</h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            Brindar indumentaria que refleje la pasión y el estilo de vida del fútbol, apostando siempre por la mejor
                            calidad.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-center hover:bg-gray-750 transition-colors duration-200">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <EyeIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-indigo-400 mb-3">Nuestra Visión</h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            Ser referentes en la venta de indumentaria deportiva del país.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-center hover:bg-gray-750 transition-colors duration-200">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <StarIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-indigo-400 mb-3">Nuestros Valores</h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            Pasión, identidad, respeto por la cultura, compromiso con la comunidad y calidad en todo lo que hacemos.
                        </p>
                    </div>
                </section>

                {/* Ubicación */}
                <section className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
                        <MapPinIcon className="h-6 w-6 text-indigo-500" />
                        ¿Dónde estamos?
                    </h2>
                    <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                        Nos encontramos San Miguel de Tucumán, Tucumán, Argentina. Realizamos envíos a todo el país y también podés
                        coordinar retiro en la siguiente ubicación.
                    </p>
                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-600">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2117.1355893360833!2d-65.21134203830806!3d-26.821388858928767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c3e1171fec9%3A0x170c325246c7e661!2sPcia%20de%20Corrientes%20942%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1751243613444!5m2!1ses!2sar"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-48 sm:h-64 lg:h-80"
                            style={{ filter: "invert(90%) hue-rotate(180deg)" }}
                        />
                    </div>
                </section>

                {/* Contacto */}
                <section className="text-center bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-4">¿Querés hablar con nosotros?</h2>
                    <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                        Podés escribirnos a nuestro <span className="text-green-400 font-semibold">Whatsapp</span> o mandarnos un DM
                        por <span className="text-pink-400 font-semibold">Instagram</span> en los enlaces que encontrarás debajo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="flex items-center gap-2 text-green-400">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">WhatsApp disponible</span>
                        </div>
                        <div className="flex items-center gap-2 text-pink-400">
                            <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">Instagram activo</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ConocenosPage
