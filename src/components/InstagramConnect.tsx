'use client'

import { motion } from 'framer-motion'

export default function InstagramConnect() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-pink-400 via-purple-400 to-pink-300 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 text-9xl">📷</div>
            <div className="absolute bottom-0 left-0 text-9xl">💖</div>
            <div className="absolute top-1/2 left-1/2 text-9xl opacity-50">✨</div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-6xl mb-6"
            >
              📸
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-black text-white mb-6"
            >
              Check Us on Instagram! 📱
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-white text-opacity-95 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Lihat konten menarik, behind-the-scenes, dan promo eksklusif Mocemilanko! Follow kami untuk update terbaru tentang rasa-rasa baru dan penawaran spesial. 🌶️✨
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              href="https://www.instagram.com/mocemilanko?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 rounded-full font-black text-lg bg-white text-transparent bg-clip-text hover:shadow-2xl transition-all border-2 border-white hover:bg-opacity-90 text-white bg-gradient-to-r from-basreng-orange to-basreng-red"
            >
              Follow @mocemilanko 🤳
            </motion.a>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-white text-center"
            >
              <div>
                <p className="text-3xl font-bold mb-1">🌟</p>
                <p className="text-sm">Konten Eksklusif</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">💬</p>
                <p className="text-sm">Direct Message</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">🎉</p>
                <p className="text-sm">Promo & Giveaway</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
