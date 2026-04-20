'use client'

import { useEffect, useState } from 'react'
import WhatsAppButton, { getWhatsAppLink } from './WhatsAppButton'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-basreng-orange via-cheese-yellow to-corn-green bg-clip-text text-transparent">
            🌶️ Mocemilanko
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#flavors"
            className="text-gray-700 hover:text-basreng-orange transition-colors font-medium"
          >
            Rasa
          </a>
          <a
            href="#products"
            className="text-gray-700 hover:text-basreng-orange transition-colors font-medium"
          >
            Produk
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-basreng-orange transition-colors font-medium"
          >
            Tentang
          </a>
          <a
            href="#howto"
            className="text-gray-700 hover:text-basreng-orange transition-colors font-medium"
          >
            Cara Pesan
          </a>
        </div>

        <WhatsAppButton
          text="Pesan Sekarang"
          className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white hover:shadow-xl"
        />
      </nav>
    </header>
  )
}
