'use client'

import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  emoji: string
  flavors: string[]
  description: string
  colorGradient: string
}

const products: Product[] = [
  {
    id: 'basreng',
    name: 'Basreng 🍟',
    emoji: '🌶️',
    flavors: ['Pedas', 'Gurih'],
    description: 'Bola goreng meatball yang super renyah dan pedas menggigit. Cemilan sempurna untuk menemani hari Anda!',
    colorGradient: 'from-basreng-red to-basreng-orange',
  },
  {
    id: 'mie-lidi-balado',
    name: 'Mie Lidi Balado 🔴',
    emoji: '🔴',
    flavors: ['Pedas', 'Tradisional'],
    description: 'Mie lidi dengan rasa balado yang kaya. Nikmat, pedas pas, dengan bumbu tradisional yang autentik.',
    colorGradient: 'from-balado-red to-basreng-orange',
  },
  {
    id: 'mie-lidi-chicken',
    name: 'Mie Lidi Ayam Bawang 🧅',
    emoji: '🧅',
    flavors: ['Gurih', 'Aromatis'],
    description: 'Perpaduan sempurna rasa ayam dan bawang. Gurih, wangi, cocok untuk segala kesempatan.',
    colorGradient: 'from-chicken-yellow to-chicken-brown',
  },
  {
    id: 'mie-lidi-original',
    name: 'Mie Lidi Original ✨',
    emoji: '✨',
    flavors: ['Klasik', 'Netral'],
    description: 'Rasa original yang timeless. Asin, gurih, perfect untuk pairing dengan apapun atau dimakan doang!',
    colorGradient: 'from-original-cream to-original-beige',
  },
  {
    id: 'mie-lidi-bbq',
    name: 'Mie Lidi Barbeque 🔥',
    emoji: '🔥',
    flavors: ['Smoky', 'Bold'],
    description: 'Rasa BBQ yang kaya dan berani dengan aroma smoke yang menggugah. Untuk petualangan rasa!',
    colorGradient: 'from-bbq-brown to-bbq-orange',
  },
  {
    id: 'mie-lidi-cheese',
    name: 'Mie Lidi Keju 🧀',
    emoji: '🧀',
    flavors: ['Gurih', 'Creamy'],
    description: 'Keju yang gurih dan creamy dalam setiap gigitan. Bagi penggemar keju, ini adalah langit!',
    colorGradient: 'from-cheese-yellow to-corn-yellow',
  },
  {
    id: 'mie-lidi-corn',
    name: 'Mie Lidi Jagung Bakar 🌽',
    emoji: '🌽',
    flavors: ['Manis', 'Lembut'],
    description: 'Jagung bakar yang manis dan gurih. Rasa jagung asli yang legit dan bikin ketagihan!',
    colorGradient: 'from-corn-yellow to-corn-green',
  },
]

export default function ProductShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Koleksi Produk Kami 🎭
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Setiap produk dibuat dengan cinta dan bahan berkualitas. Pilih favorit Anda dan rasakan perbedaannya!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`bg-gradient-to-br ${product.colorGradient} rounded-2xl p-6 text-white shadow-lg overflow-hidden group cursor-pointer relative`}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4">{product.emoji}</div>
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-sm mb-4 leading-relaxed opacity-95">{product.description}</p>

                {/* Flavor tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.flavors.map((flavor) => (
                    <span
                      key={flavor}
                      className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-xs font-semibold backdrop-blur-sm"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>

                {/* Order button */}
                <motion.a
                  href={`https://wa.me/628123456789?text=Halo%20Mocemilanko%2C%20saya%20mau%20pesan%20${product.name.split(' ')[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block text-center bg-white text-gray-900 font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  Pesan Sekarang
                </motion.a>
              </div>

              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-2">🎁 Inovasi Baru Datang!</h3>
          <p className="text-lg">
            Kami sedang mengembangkan produk snack baru dengan rasa-rasa exciting. Jadilah yang pertama tahu!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
