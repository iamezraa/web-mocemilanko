'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">
              Tentang Mocemilanko 🌟
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Mocemilanko lahir dari passion sederhana: menciptakan cemilan yang tidak hanya enak, tapi juga membawa
                cerita dan kegembiraan di setiap gigitan.
              </p>

              <p>
                Kami percaya bahwa cemilan bukan hanya tentang kepedasan. Ngemil itu seharusnya menjadi petualangan rasa!
                Dari pedas yang menggairahkan, gurih yang memuaskan, hingga manis yang menyenangkan - semua ada di
                Mocemilanko.
              </p>

              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-6 my-6 border-2 border-orange-300">
                <p className="font-bold text-xl text-gray-900 mb-2">🎯 Visi Kami</p>
                <p className="text-gray-800">
                  Menjadi brand snack pilihan yang menghadirkan variasi rasa lengkap untuk semua selera dan mood, dengan
                  kualitas yang never compromise.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-lime-100 rounded-xl p-6 my-6 border-2 border-green-300">
                <p className="font-bold text-xl text-gray-900 mb-2">💚 Komitmen Kami</p>
                <p className="text-gray-800">
                  Bahan berkualitas, proses higienis, cita rasa autentik, dan layanan pelanggan terbaik adalah
                  prioritas kami.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-basreng-orange to-basreng-red rounded-2xl p-8 text-white shadow-lg">
              <div className="text-5xl mb-4">🌶️</div>
              <h3 className="text-2xl font-bold mb-3">Variasi Rasa Lengkap</h3>
              <p className="text-opacity-90 text-white">
                Tidak peduli selera Anda, ada rasa Mocemilanko yang cocok untuk Anda. Dari pedas, gurih, hingga manis!
              </p>
            </div>

            <div className="bg-gradient-to-br from-cheese-yellow to-corn-yellow rounded-2xl p-8 text-gray-900 shadow-lg">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-3">Kualitas Premium</h3>
              <p className="text-gray-800">
                Setiap produk dipilih dan dipersiapkan dengan standar kualitas tinggi untuk kepuasan Anda.
              </p>
            </div>

            <div className="bg-gradient-to-br from-corn-green to-lime-500 rounded-2xl p-8 text-white shadow-lg">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Layanan Cepat</h3>
              <p className="text-opacity-90 text-white">
                Pesan hari ini, terima besok! Kami memastikan cemilan Anda sampai dalam kondisi segar dan siap dinikmati.
              </p>
            </div>

            <div className="bg-gradient-to-br from-balado-red to-basreng-orange rounded-2xl p-8 text-white shadow-lg">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold mb-3">Dibuat dengan Cinta</h3>
              <p className="text-opacity-90 text-white">
                Setiap produk Mocemilanko dibuat dengan passion dan dedikasi untuk memberikan yang terbaik kepada Anda.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-md border-l-4 border-basreng-orange">
            <p className="text-4xl font-bold text-basreng-orange mb-2">7+</p>
            <p className="text-gray-600 font-semibold">Pilihan Rasa</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border-l-4 border-cheese-yellow">
            <p className="text-4xl font-bold text-cheese-yellow mb-2">100%</p>
            <p className="text-gray-600 font-semibold">Fresh Daily</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border-l-4 border-corn-green">
            <p className="text-4xl font-bold text-corn-green mb-2">💯</p>
            <p className="text-gray-600 font-semibold">Customer Love</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border-l-4 border-balado-red">
            <p className="text-4xl font-bold text-balado-red mb-2">🚀</p>
            <p className="text-gray-600 font-semibold">Growing Fast</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
