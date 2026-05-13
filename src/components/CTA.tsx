'use client'

import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-basreng-red via-basreng-orange to-cheese-yellow rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 text-9xl">🌶️</div>
            <div className="absolute bottom-0 left-0 text-9xl">🧀</div>
            <div className="absolute top-1/2 left-1/2 text-9xl opacity-50">✨</div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-black text-white mb-6"
            >
              Lagi Pengen Rasa Apa Hari Ini? 🤔
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-white text-opacity-95 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Jangan tunggu lagi! Pesan cemilan favorit Anda sekarang via WhatsApp dan rasakan pengalaman ngemil yang
              berbeda. Kami siap melayani dengan cepat dan profesional!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                className="bg-white text-basreng-orange text-lg px-8 py-4 rounded-full font-black shadow-xl hover:shadow-2xl transition-all"
              >
                🛒 Pesan Sekarang!
              </motion.button>

              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-bold border-2 border-white text-white hover:bg-white hover:text-basreng-orange transition-all text-lg"
              >
                ⬆️ Lihat Semua Menu
              </motion.a>
            </motion.div>

            {/* Quick Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center"
            >
              <div className="py-3 px-2">
                <p className="text-2xl mb-1">⚡</p>
                <p className="font-bold text-sm">Pesanan Cepat</p>
              </div>
              <div className="py-3 px-2">
                <p className="text-2xl mb-1">✨</p>
                <p className="font-bold text-sm">Fresh & Segar</p>
              </div>
              <div className="py-3 px-2">
                <p className="text-2xl mb-1">💯</p>
                <p className="font-bold text-sm">Kualitas Terbaik</p>
              </div>
              <div className="py-3 px-2">
                <p className="text-2xl mb-1">😋</p>
                <p className="font-bold text-sm">Rasa Nikmat</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
