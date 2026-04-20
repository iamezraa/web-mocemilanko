'use client'

import { motion } from 'framer-motion'

interface Step {
  number: number
  icon: string
  title: string
  description: string
  color: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: '🎯',
    title: 'Pilih Rasa Favorit',
    description: 'Explore berbagai pilihan rasa Mocemilanko yang tersedia dan pilih yang paling sesuai dengan mood Anda!',
    color: 'from-basreng-orange to-basreng-red',
  },
  {
    number: 2,
    icon: '💬',
    title: 'Hubungi via WhatsApp',
    description:
      'Klik tombol "Pesan via WhatsApp" atau hubungi kami langsung. Gampang, cepat, dan praktis!',
    color: 'from-chicken-yellow to-chicken-brown',
  },
  {
    number: 3,
    icon: '📝',
    title: 'Berikan Detail Pesanan',
    description:
      'Beritahu kami rasa yang ingin Anda pesan, jumlah, dan alamat pengiriman. Kami siap membantu!',
    color: 'from-cheese-yellow to-corn-yellow',
  },
  {
    number: 4,
    icon: '💳',
    title: 'Konfirmasi & Bayar',
    description:
      'Kami akan konfirmasi pesanan Anda dan memberi tahu cara pembayaran. Berbagai metode tersedia!',
    color: 'from-balado-red to-basreng-orange',
  },
  {
    number: 5,
    icon: '🚚',
    title: 'Proses & Pengiriman',
    description: 'Kami langsung proses pesanan Anda dengan fresh dan siap kirim dalam hitungan jam!',
    color: 'from-corn-green to-lime-500',
  },
  {
    number: 6,
    icon: '😋',
    title: 'Nikmati!',
    description: 'Terima cemilan Anda dan nikmati petualangan rasa yang seru. Jangan lupa mereview! ⭐',
    color: 'from-balado-red to-basreng-orange',
  },
]

export default function HowToOrder() {
  return (
    <section id="howto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Cara Pesan Mocemilanko 📦
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proses pemesanan kami sangat mudah dan cepat. Ikuti langkah-langkah di bawah ini!
          </p>
        </motion.div>

        {/* Desktop View - Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-basreng-orange via-cheese-yellow to-corn-green transform -translate-y-1/2" />

            {/* Steps */}
            <div className="grid grid-cols-6 gap-4 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  {/* Circle with number */}
                  <div
                    className={`bg-gradient-to-br ${step.color} rounded-full w-24 h-24 flex items-center justify-center text-white font-bold text-4xl mb-6 shadow-lg ring-4 ring-white relative z-20`}
                  >
                    {step.icon}
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-xl p-4 text-center shadow-lg w-full">
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - Vertical */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {/* Number circle */}
              <div
                className={`bg-gradient-to-br ${step.color} rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0`}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-grow bg-white rounded-xl p-4 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-lg">
            <p className="text-4xl mb-3">⏱️</p>
            <h3 className="font-bold text-xl mb-2">Cepat</h3>
            <p>Pesan hari ini, terima besok atau sesuai kesepakatan!</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg">
            <p className="text-4xl mb-3">💳</p>
            <h3 className="font-bold text-xl mb-2">Fleksibel</h3>
            <p>Berbagai metode pembayaran tersedia untuk kemudahan Anda.</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl p-8 text-white shadow-lg">
            <p className="text-4xl mb-3">✅</p>
            <h3 className="font-bold text-xl mb-2">Aman</h3>
            <p>Transaksi aman dan produk dijamin segar sampai tangan Anda!</p>
          </div>
        </motion.div>

        {/* FAQ Mini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-orange-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">❓ Pertanyaan Umum</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-gray-900 mb-2">Q: Berapa lama proses pengiriman?</p>
              <p className="text-gray-700">A: Biasanya pengiriman dalam 24 jam setelah pesanan dikonfirmasi.</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-2">Q: Apakah ada biaya pengiriman?</p>
              <p className="text-gray-700">A: Biaya pengiriman tergantung lokasi. Kami akan infokan saat Anda pesan.</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-2">Q: Bisa pesan dalam jumlah besar?</p>
              <p className="text-gray-700">A: Tentu! Hubungi kami untuk pemesanan korporat atau event.</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-2">Q: Ada testimoni pelanggan?</p>
              <p className="text-gray-700">A: Lihat bagian Testimoni kami untuk review pelanggan yang puas!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
