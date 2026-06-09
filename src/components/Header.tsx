'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAdmin } from '@/context/AdminContext'

interface HeaderProps {
  cartButton?: React.ReactNode
}

export default function Header({ cartButton }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, admin, logout } = useAdmin()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    window.location.href = '/'
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-basreng-orange via-cheese-yellow to-corn-green bg-clip-text text-transparent">
            🌶️ Mocemilanko
          </div>
        </Link>

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
          <Link
            href="/admin/orders"
            className="text-gray-700 hover:text-basreng-orange transition-colors font-medium"
          >
            📋 Riwayat Pesanan
          </Link>
          
          {/* Admin Links - Only for authenticated admins */}
          {isAuthenticated && admin && (
            <>
              <div className="w-px h-6 bg-gray-300"></div>
              <Link
                href="/admin/dashboard"
                className="text-gray-700 hover:text-basreng-orange transition-colors font-medium text-sm"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/admin/orders"
                className="text-gray-700 hover:text-basreng-orange transition-colors font-medium text-sm"
              >
                📋 Pesanan
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-gray-700 hover:text-basreng-orange transition-colors font-medium text-sm disabled:opacity-50"
              >
                {isLoggingOut ? '⏳ Logout...' : '🚪 Logout'}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {cartButton}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('products')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Pesan Sekarang
          </motion.button>
        </div>
      </nav>
    </header>
  )
}
