'use client'

import { motion } from 'framer-motion'
import WhatsAppButton, { getWhatsAppLink } from './WhatsAppButton'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <div>
            <div className="text-3xl font-black mb-4 bg-gradient-to-r from-basreng-orange via-cheese-yellow to-corn-green bg-clip-text text-transparent">
              🌶️ Mocemilanko
            </div>
            <p className="text-gray-400 mb-6">
              Banyak Rasa, Banyak Cerita! Cemilan berkualitas dengan berbagai pilihan rasa untuk semua selera.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-br from-basreng-orange to-basreng-red rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                📷
              </motion.a>
              <motion.a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                🎵
              </motion.a>
              <motion.a
                href={getWhatsAppLink('Halo Mocemilanko! Saya ingin menghubungi Anda.')}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                💬
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Menu Utama</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#flavors" className="hover:text-basreng-orange transition-colors">
                  → Rasa-Rasa Kami
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-basreng-orange transition-colors">
                  → Produk
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-basreng-orange transition-colors">
                  → Tentang Kami
                </a>
              </li>
              <li>
                <a href="#howto" className="hover:text-basreng-orange transition-colors">
                  → Cara Pesan
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-basreng-orange transition-colors">
                  → Testimoni
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Hubungi Kami</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span>📱</span>
                <span>
                  <a
                    href={getWhatsAppLink('Halo Mocemilanko!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-basreng-orange transition-colors"
                  >
                    +62 812-345-6789
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <span>
                  <a href="mailto:hello@mocemilanko.com" className="hover:text-basreng-orange transition-colors">
                    hello@mocemilanko.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⏰</span>
                <span>Setiap hari 08:00 - 21:00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Jangan Ketinggalan!</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Jadilah yang pertama tahu tentang produk baru dan promo spesial Mocemilanko!
            </p>
            <WhatsAppButton
              text="📢 Ikuti Update"
              className="w-full bg-gradient-to-r from-basreng-orange to-basreng-red text-white justify-center text-sm"
            />
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left text-gray-400 text-sm mb-8"
        >
          <div>
            <p className="font-semibold text-white mb-2">🚀 Pengiriman</p>
            <p>Tersedia pengiriman ke seluruh kota-kota besar Indonesia dengan jaminan kualitas terbaik.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">💳 Pembayaran</p>
            <p>Terima Transfer Bank, E-wallet, dan metode pembayaran modern lainnya untuk kemudahan Anda.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">✅ Kepuasan</p>
            <p>Jika tidak puas, kami siap mengganti atau mengembalikan dana Anda. Kepuasan pelanggan prioritas!</p>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Mocemilanko. Semua hak cipta dilindungi. | Banyak Rasa, Banyak Cerita!</p>
          <p className="mt-2">Made with ❤️ untuk para pecinta cemilan lezat 🌶️🧀🌽</p>
        </div>
      </div>
    </footer>
  )
}
