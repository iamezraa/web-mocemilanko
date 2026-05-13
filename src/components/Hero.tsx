'use client'

import { motion } from 'framer-motion'

const floatingElements = [
  { emoji: '🌶️', delay: 0, duration: 4, x: [-20, 20, -20], y: [0, 40, 0] },
  { emoji: '🧀', delay: 0.5, duration: 5, x: [20, -20, 20], y: [0, -40, 0] },
  { emoji: '🍯', delay: 1, duration: 4.5, x: [-15, 15, -15], y: [0, 35, 0] },
  { emoji: '✨', delay: 1.5, duration: 5.5, x: [15, -15, 15], y: [0, 45, 0] },
  { emoji: '🌽', delay: 0.3, duration: 4.8, x: [-25, 25, -25], y: [0, 30, 0] },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100 -z-10" />

      {/* Animated floating elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl"
            initial={{ x: 0, y: 0 }}
            animate={{ x: element.x, y: element.y }}
            transition={{
              delay: element.delay,
              duration: element.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${(index * 20) % 100}%`,
              top: `${(index * 25) % 100}%`,
              opacity: 0.3,
            }}
          >
            {element.emoji}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-basreng-red via-basreng-orange to-cheese-yellow bg-clip-text text-transparent">
              Mocemilanko
            </span>
            <br />
            <span className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-500 via-green-500 to-red-500 bg-clip-text text-transparent">
              Snack
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            🎉 Banyak Rasa, Banyak Cerita!
          </p>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Cemilan seru untuk semua mood dengan berbagai pilihan rasa: dari pedas yang menggairahkan,
            gurih yang memuaskan, hingga manis yang menyenangkan. 👀
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('products')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="bg-gradient-to-r from-basreng-red to-basreng-orange text-white text-lg px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            🛒 Pesan Sekarang
          </motion.button>
          <motion.a
            href="#flavors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-bold border-2 border-basreng-orange text-basreng-orange hover:bg-basreng-orange hover:text-white transition-all text-lg"
          >
            ⬇️ Lihat Rasa-Rasa Kami
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex justify-center gap-8 text-center flex-wrap"
        >
          <div>
            <p className="text-3xl font-bold text-basreng-orange">7+</p>
            <p className="text-gray-600">Pilihan Rasa</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cheese-yellow">100%</p>
            <p className="text-gray-600">Lezat & Segar</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-corn-green">⚡</p>
            <p className="text-gray-600">Pengiriman Cepat</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
