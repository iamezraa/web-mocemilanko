'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Flavor {
  id: string
  name: string
  icon: string
  description: string
  colors: {
    primary: string
    secondary: string
  }
  tags: string[]
}

const flavors: Flavor[] = [
  {
    id: 'basreng-spicy',
    name: 'Basreng Pedas 🌶️',
    icon: '🌶️',
    description: 'Basreng dengan tingkat kepedasan yang pas untuk para pencinta sensasi! Gurih, pedas, dan menggugah selera.',
    colors: { primary: 'from-basreng-red', secondary: 'to-basreng-orange' },
    tags: ['Pedas', 'Gurih', 'Populer ⭐'],
  },
  {
    id: 'balado',
    name: 'Balado Mie Lidi 🔴',
    icon: '🔴',
    description: 'Mie Lidi dengan rasa balado tradisional yang autentik. Panas yang pas dengan rasa khas Minang yang lezat.',
    colors: { primary: 'from-balado-red', secondary: 'to-basreng-orange' },
    tags: ['Pedas Galak', 'Tradisional', 'Best Seller'],
  },
  {
    id: 'chicken-onion',
    name: 'Ayam Bawang 🧅',
    icon: '🧅',
    description: 'Kombinasi sempurna antara rasa ayam yang gurih dan bawang yang harum. Sempurna untuk segala kesempatan!',
    colors: { primary: 'from-chicken-yellow', secondary: 'to-chicken-brown' },
    tags: ['Gurih', 'Aromatis', 'Favorit Keluarga'],
  },
  {
    id: 'original-salty',
    name: 'Original Asin ✨',
    icon: '✨',
    description: 'Rasa klasik yang timeless. Asin, gurih, dan simple tapi sempurna. Cocok menemani segala aktivitas.',
    colors: { primary: 'from-original-cream', secondary: 'to-original-beige' },
    tags: ['Klasik', 'Netral', 'Pairing Terbaik'],
  },
  {
    id: 'bbq',
    name: 'Barbeque 🔥',
    icon: '🔥',
    description: 'Rasa BBQ yang kaya dan berani. Asap, gurih, sedikit manis. Untuk yang suka petualangan rasa!',
    colors: { primary: 'from-bbq-brown', secondary: 'to-bbq-orange' },
    tags: ['Bold', 'Smoky', 'Adventurous'],
  },
  {
    id: 'cheese',
    name: 'Keju 🧀',
    icon: '🧀',
    description: 'Keju yang gurih dan creamy. Rasa keju yang autentik membuat setiap gigitan nikmat. Cheese lovers wajib coba!',
    colors: { primary: 'from-cheese-yellow', secondary: 'to-corn-yellow' },
    tags: ['Gurih', 'Creamy', 'Paling Populer ⭐⭐'],
  },
  {
    id: 'roasted-corn',
    name: 'Jagung Bakar 🌽',
    icon: '🌽',
    description: 'Jagung bakar yang manis dan gurih sekaligus. Rasa jagung asli yang legit dan bikin ketagihan!',
    colors: { primary: 'from-corn-yellow', secondary: 'to-corn-green' },
    tags: ['Manis', 'Lembut', 'Refreshing'],
  },
]

export default function FlavorExperience() {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(flavors[0])

  return (
    <section id="flavors" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Petualangan Rasa Dimulai di Sini 🎨
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih rasa favoritmu dari berbagai pilihan yang kami sediakan. Setiap rasa punya cerita dan karakter uniknya sendiri!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flavor Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {selectedFlavor && (
              <div
                className={`bg-gradient-to-br ${selectedFlavor.colors.primary} ${selectedFlavor.colors.secondary} rounded-3xl p-8 text-white shadow-2xl`}
              >
                <div className="text-8xl mb-6">{selectedFlavor.icon}</div>
                <h3 className="text-3xl font-bold mb-4">{selectedFlavor.name}</h3>
                <p className="text-lg mb-8 leading-relaxed">{selectedFlavor.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedFlavor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white bg-opacity-30 rounded-full text-sm font-semibold backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={`https://wa.me/628123456789?text=Halo%20Mocemilanko%2C%20saya%20mau%20pesan%20snack%20dengan%20varian%20${selectedFlavor.name.split(' ')[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block text-center bg-white text-gray-900 font-bold py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  Pesan Rasa Ini via WhatsApp
                </motion.a>
              </div>
            )}
          </motion.div>

          {/* Flavor Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {flavors.map((flavor, index) => (
                <motion.button
                  key={flavor.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedFlavor(flavor)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-2xl font-bold text-center transition-all cursor-pointer border-2 ${
                    selectedFlavor?.id === flavor.id
                      ? `border-gray-900 bg-gradient-to-br ${flavor.colors.primary} ${flavor.colors.secondary} text-white shadow-lg`
                      : 'border-gray-200 bg-white hover:border-gray-400 text-gray-900 hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-2">{flavor.icon}</div>
                  <div className="text-sm sm:text-base">{flavor.name.split(' ')[0]}</div>
                </motion.button>
              ))}
            </div>

            {/* Flavor Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <p className="text-2xl font-bold text-basreng-orange">7+</p>
                <p className="text-sm text-gray-600">Varian Rasa</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <p className="text-2xl font-bold text-cheese-yellow">🔥 Hot</p>
                <p className="text-sm text-gray-600">Original Terbaik</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <p className="text-2xl font-bold text-corn-green">✅ Fresh</p>
                <p className="text-sm text-gray-600">Setiap Hari</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
