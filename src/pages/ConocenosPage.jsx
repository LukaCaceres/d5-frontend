import React from 'react';

const ConocenosPage = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
            {/* Título principal */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-indigo-900 mb-4">Conocenos</h1>
                <p className="text-lg text-gray-600">Somos más que una tienda de ropa: somos pasión por el deporte.</p>
            </div>

            {/* Quiénes somos */}
            <section className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-indigo-800 mb-3">¿Quiénes somos?</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Doble Cinco nació con la idea de llevar la pasión por el deporte a cada rincón del país. Desde nuestras primeras camisetas hasta los últimos lanzamientos, buscamos que cada apasionado por el deporte pueda tener la prenda que tanto desea.
                    </p>
                </div>
            </section>

            {/* Misión, Visión, Valores */}
            <section className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Nuestra Misión</h3>
                    <p className="text-gray-700 text-sm">
                        Brindar indumentaria que refleje la pasión y el estilo de vida del fútbol, apostando siempre por la mejor calidad.
                    </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Nuestra Visión</h3>
                    <p className="text-gray-700 text-sm">
                        Ser referentes en la venta de indumentaria deportiva del país.
                    </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Nuestros Valores</h3>
                    <p className="text-gray-700 text-sm">
                        Pasión, identidad, respeto por la cultura, compromiso con la comunidad y calidad en todo lo que hacemos.
                    </p>
                </div>
            </section>

            {/* Ubicación */}
            <section>
                <h2 className="text-2xl font-semibold text-indigo-800 mb-3">¿Dónde estamos?</h2>
                <p className="text-gray-700 mb-4">
                    Nos encontramos San Miguel de Tucumán, Tucumán, Argentina. Realizamos envíos a todo el país y también podés coordinar retiro en la siguiente ubicación.
                </p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2117.1355893360833!2d-65.21134203830806!3d-26.821388858928767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c3e1171fec9%3A0x170c325246c7e661!2sPcia%20de%20Corrientes%20942%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1751243613444!5m2!1ses!2sar" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="w-full h-64 rounded-lg shadow"></iframe>
            </section>

            {/* Contacto */}
            <section className="text-center">
                <h2 className="text-2xl font-semibold text-indigo-800 mb-3">¿Querés hablar con nosotros?</h2>
                <p className="text-gray-700 mb-4">
                    Podés escribirnos a nuestro <span class='text-green-500'>Whatsapp</span> o mandarnos un DM por <span className='text-pink-500'>Instagram</span> en los enlaces que encontrarás debajo.
                </p>
            </section>
        </div>
    );
};

export default ConocenosPage;
