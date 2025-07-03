"use client"
import { ChatBubbleLeftRightIcon, CameraIcon } from "@heroicons/react/24/outline"
import logo from "../assets/images/d5-logo.webp"

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 py-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
        {/* Left Column: Logo */}
        <div className="flex justify-center sm:justify-start">
          <img
            src={logo || "/placeholder.svg"}
            alt="Logo Doble Cinco"
            className="h-10 sm:h-12 w-auto filter brightness-0 invert"
          />
        </div>

        {/* Middle Column: Social Media */}
        <div className="flex flex-col md:flex-row md:justify-center items-center space-y-3 md:space-y-0 md:space-x-6">
          <a
            href="https://wa.me/543812160193"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
          >
            <div className="p-2 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors duration-200">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-400" />
            </div>
            <span className="font-medium">WhatsApp</span>
          </a>
          <a
            href="https://www.instagram.com/doble_5inco5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors duration-200 group"
          >
            <div className="p-2 bg-pink-600/20 rounded-lg group-hover:bg-pink-600/30 transition-colors duration-200">
              <CameraIcon className="h-5 w-5 text-pink-400" />
            </div>
            <span className="font-medium">Instagram</span>
          </a>
        </div>

        {/* Right Column: Copyright */}
        <div className="text-center sm:text-right text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Doble Cinco Store.</p>
          <p className="text-xs mt-1">Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
