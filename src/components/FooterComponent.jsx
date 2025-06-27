import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
const FooterComponent = () => {
    return (
        <footer className="bg-gray py-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
                {/* Columna izquierda: Logo */}
                <div className="flex justify-center sm:justify-start">
                    <img
                        src="src\assets\images\d5-logo-black.webp"
                        alt="Logo Doble Cinco"
                        className="h-12"
                    />
                </div>

                {/* Columna del medio: Redes sociales */}
                <div className="flex flex-col items-center space-y-2">
                    <a
                        href="https://wa.me/5491112345678"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                    >
                        <FaWhatsapp className="text-xl" />
                        <span>WhatsApp</span>
                    </a>
                    <a
                        href="https://www.facebook.com/doble5store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                    >
                        <FaFacebookF className="text-xl" />
                        <span>Facebook</span>
                    </a>
                    <a
                        href="https://www.instagram.com/doble5store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-700 hover:text-pink-500"
                    >
                        <FaInstagram className="text-xl" />
                        <span>Instagram</span>
                    </a>
                </div>

                {/* Columna derecha: Copyright */}
                <div className="text-center sm:text-right text-gray-500">
                    &copy; {new Date().getFullYear()} Doble5 Store. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent