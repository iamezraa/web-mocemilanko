'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  emoji: string
  description: string
  price: number
  colorGradient: string
  flavors?: { name: string; emoji: string }[]
}

interface FlavorTheme {
  gradient: string
  glowColor: string
  shadowColor: string
  accentColor: string
  buttonBgGradient: string
  description: string
  decorativeEmoji: string
}

const flavorThemes: Record<string, FlavorTheme> = {
  'Pedas': {
    gradient: 'from-red-600 via-red-500 to-orange-500',
    glowColor: 'from-red-500 to-orange-400',
    shadowColor: 'shadow-red-500/50',
    accentColor: 'ring-red-400',
    buttonBgGradient: 'from-red-400 to-red-500',
    description: 'Bola goreng meatball yang super renyah dengan pedas menggigit. Sensasi pedas gurih yang bikin ketagihan!',
    decorativeEmoji: '🌶️',
  },
  'Balado': {
    gradient: 'from-red-700 via-red-600 to-orange-600',
    glowColor: 'from-red-500 to-red-400',
    shadowColor: 'shadow-red-500/60',
    accentColor: 'ring-red-400',
    buttonBgGradient: 'from-red-500 to-orange-500',
    description: 'Mie lidi renyah dengan rasa balado pedas gurih yang bikin nagih. Sensasi autentik dari cita rasa nusantara.',
    decorativeEmoji: '🌶️',
  },
  'Ayam Bawang': {
    gradient: 'from-amber-600 via-yellow-500 to-orange-600',
    glowColor: 'from-yellow-400 to-amber-400',
    shadowColor: 'shadow-amber-500/50',
    accentColor: 'ring-amber-400',
    buttonBgGradient: 'from-amber-400 to-orange-400',
    description: 'Perpaduan rasa ayam bawang gurih yang klasik dan lezat. Aroma savory yang menggugah selera.',
    decorativeEmoji: '🧅',
  },
  'Original Asin': {
    gradient: 'from-sky-300 via-blue-200 to-cyan-300',
    glowColor: 'from-sky-300 to-blue-300',
    shadowColor: 'shadow-blue-300/40',
    accentColor: 'ring-sky-400',
    buttonBgGradient: 'from-sky-300 to-blue-300',
    description: 'Rasa original asin yang ringan, gurih, dan cocok dinikmati kapan saja. Kesederhanaan yang sempurna.',
    decorativeEmoji: '🧂',
  },
  'Barbeque': {
    gradient: 'from-amber-900 via-orange-700 to-orange-600',
    glowColor: 'from-orange-500 to-amber-400',
    shadowColor: 'shadow-orange-600/60',
    accentColor: 'ring-orange-400',
    buttonBgGradient: 'from-orange-500 to-amber-500',
    description: 'Sensasi barbeque smoky manis gurih dengan aroma yang menggoda. Cita rasa panggang yang autentik.',
    decorativeEmoji: '🔥',
  },
  'Keju': {
    gradient: 'from-yellow-500 via-yellow-400 to-amber-400',
    glowColor: 'from-yellow-300 to-yellow-200',
    shadowColor: 'shadow-yellow-400/50',
    accentColor: 'ring-yellow-300',
    buttonBgGradient: 'from-yellow-400 to-amber-300',
    description: 'Rasa keju creamy gurih yang lumer di setiap gigitan. Kelezatan keju yang manis dan menggugah.',
    decorativeEmoji: '🧀',
  },
  'Jagung Bakar': {
    gradient: 'from-yellow-500 via-green-400 to-emerald-500',
    glowColor: 'from-yellow-400 to-green-400',
    shadowColor: 'shadow-green-500/50',
    accentColor: 'ring-green-400',
    buttonBgGradient: 'from-yellow-400 to-green-400',
    description: 'Perpaduan rasa jagung bakar manis gurih yang unik dan nikmat. Kesegaran jagung dalam setiap gigitan.',
    decorativeEmoji: '🌽',
  },
}

    const products: Product[] = [
      {
        id: 'basreng',
        name: 'Basreng 🍟',
        emoji: '🍟',
        description: 'Bola goreng meatball yang super renyah dan pedas menggigit. Cemilan sempurna untuk menemani hari Anda!',
        flavors: [{ name: 'Pedas', emoji: '🌶️' }],
        price: 5000,
        colorGradient: 'from-basreng-red to-basreng-orange',
      },
      {
        id: 'mie-lidi',
        name: 'Mie Lidi 🍜',
        emoji: '🍜',
        description: 'Mie lidi renyah dengan berbagai pilihan rasa autentik yang menggugah selera.',
        flavors: [
          { name: 'Balado', emoji: '🔴' },
          { name: 'Ayam Bawang', emoji: '🧅' },
          { name: 'Original Asin', emoji: '🧂' },
          { name: 'Barbeque', emoji: '🔥' },
          { name: 'Keju', emoji: '🧀' },
          { name: 'Jagung Bakar', emoji: '🌽' },
        ],
        price: 2000,
        colorGradient: 'from-cheese-yellow to-corn-green',
      },
    ]

    interface ProductCardState {
      selectedFlavor: string | null
      quantity: number
    }

    export default function NewProductShowcase() {
      const { addItem } = useCart()
      const [cardState, setCardState] = useState<Record<string, ProductCardState>>({
        basreng: { selectedFlavor: 'Pedas', quantity: 1 },
        'mie-lidi': { selectedFlavor: 'Balado', quantity: 1 },
      })
      const [addedMessage, setAddedMessage] = useState<string | null>(null)
      const [sectionInView, setSectionInView] = useState(false)

      const handleFlavorSelect = (productId: string, flavor: string) => {
        setCardState((prev) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            selectedFlavor: flavor,
          },
        }))
      }

      const handleQuantityChange = (productId: string, delta: number) => {
        setCardState((prev) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity: Math.max(1, prev[productId].quantity + delta),
          },
        }))
      }

      const handleAddToCart = (product: Product) => {
        const state = cardState[product.id]
        if (!state.selectedFlavor) {
          alert('Pilih rasa terlebih dahulu!')
          return
        }

        addItem({
          productId: product.id,
          productName: product.name,
          flavor: state.selectedFlavor,
          quantity: state.quantity,
          price: product.price,
        })

        setAddedMessage(`${product.name} (${state.selectedFlavor}) ditambahkan ke keranjang! ✓`)
        setTimeout(() => setAddedMessage(null), 3000)

        // Reset state
        setCardState((prev) => ({
          ...prev,
          [product.id]: {
            selectedFlavor: product.flavors?.[0]?.name ?? null,
            quantity: 1,
          },
        }))
      }

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
              onViewportEnter={() => setSectionInView(true)}
              onViewportLeave={() => setSectionInView(false)}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <motion.h2
                animate={sectionInView ? { scale: [1, 1.05, 1], textShadow: [
                  '0 0 0px rgba(249, 115, 22, 0)',
                  '0 0 30px rgba(249, 115, 22, 0.6)',
                  '0 0 0px rgba(249, 115, 22, 0)'
                ] } : {}}
                transition={{ duration: 0.8, repeat: sectionInView ? 1 : 0 }}
                className="text-4xl sm:text-5xl font-black mb-4 text-gray-900"
              >
                Koleksi Produk Kami 🎭
              </motion.h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pilih produk dan rasa favorit Anda, atur jumlah, dan tambahkan ke keranjang belanja!
              </p>
            </motion.div>

            {/* Notification */}
            {addedMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-4 bg-green-500 text-white rounded-lg text-center font-bold"
              >
                {addedMessage}
              </motion.div>
            )}

            {/* Product Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {products.map((product) => {
                const state = cardState[product.id]
                const flavorTheme = flavorThemes[state.selectedFlavor || ''] || flavorThemes['Pedas']

                return (
                  <motion.div
                    key={product.id}
                    layout
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    animate={sectionInView ? { y: [0, -5, 0] } : {}}
                    transition={sectionInView ? { delay: product.id === 'basreng' ? 0.3 : 0.5, duration: 0.6 } : {}}
                    className={`relative rounded-3xl p-8 text-white shadow-2xl overflow-hidden group cursor-pointer`}
                    style={{
                      background: getGradientBackground(flavorTheme.gradient),
                    }}
                  >
                    {/* Animated glow effect background */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 blur-3xl opacity-20"
                      style={{
                        background: getGradientBackground(flavorTheme.glowColor),
                      }}
                    />

                    {/* Decorative floating elements */}
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-4 right-6 text-4xl opacity-20"
                    >
                      {flavorTheme.decorativeEmoji}
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, 20, 0],
                        x: [0, -10, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute bottom-6 left-4 text-3xl opacity-15"
                    >
                      {product.emoji}
                    </motion.div>

                    {/* Background glow overlay */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-6xl mb-4">{product.emoji}</div>
                      <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                  
                      {/* Dynamic description based on selected flavor */}
                      <motion.p
                        key={state.selectedFlavor}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm mb-6 leading-relaxed opacity-95"
                      >
                        {flavorTheme.description}
                      </motion.p>

                      {/* Flavor Selection */}
                      <div className="mb-6">
                        <p className="text-sm font-bold mb-3 opacity-90">Pilih Rasa:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {product.flavors?.map((flavor) => {
                            const isSelected = state.selectedFlavor === flavor.name

                            return (
                              <motion.button
                                key={flavor.name}
                                onClick={() => handleFlavorSelect(product.id, flavor.name)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                  boxShadow: isSelected
                                    ? `0 0 20px rgba(255, 255, 255, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)`
                                    : 'none',
                                }}
                                transition={{ duration: 0.3 }}
                                className={`py-2 px-3 rounded-lg font-semibold transition-all text-sm relative overflow-hidden ${
                                  isSelected
                                    ? 'bg-white text-gray-900 shadow-xl'
                                    : 'bg-white bg-opacity-30 hover:bg-opacity-50 text-white'
                                }`}
                              >
                                {/* Animated glow for selected flavor button */}
                                {isSelected && (
                                  <motion.div
                                    layoutId="flavor-glow"
                                    className="absolute inset-0 bg-white opacity-20 rounded-lg"
                                    transition={{ duration: 0.3 }}
                                  />
                                )}
                                <span className="relative z-10">
                                  {flavor.emoji} {flavor.name}
                                </span>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-6 pb-6 border-b-2 border-white border-opacity-30">
                        <p className="text-sm opacity-90">Harga per produk:</p>
                        <p className="text-2xl font-bold">Rp{product.price.toLocaleString('id-ID')}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="mb-6">
                        <p className="text-sm font-bold mb-3 opacity-90">Jumlah:</p>
                        <div className="flex items-center gap-3 bg-white bg-opacity-20 p-3 rounded-lg w-fit">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-30 hover:bg-opacity-50 rounded font-bold"
                          >
                            −
                          </motion.button>
                          <span className="w-8 text-center font-bold text-lg">{state.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-30 hover:bg-opacity-50 rounded font-bold"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>

                      {/* Add to Cart Button with dynamic accent based on flavor */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        animate={{
                          boxShadow: `0 8px 20px rgba(255, 255, 255, 0.3)`,
                        }}
                        className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all text-center"
                      >
                        🛒 Tambah ke Keranjang
                      </motion.button>
                    </div>

                    {/* Animated border glow */}
                    <motion.div
                      animate={{
                        boxShadow: `inset 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px ${getGlowBoxShadow(
                          flavorTheme.glowColor,
                        )}`,
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-3xl border-2 border-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                      style={{ pointerEvents: 'none' }}
                    />
                  </motion.div>
                )
              })}
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

    // Helper function to generate gradient background from gradient string
    function getGradientBackground(gradient: string): string {
      const gradients: Record<string, string> = {
        'from-red-700 via-red-600 to-orange-600': 'linear-gradient(135deg, #B91C1C, #DC2626, #EA580C)',
        'from-red-600 via-red-500 to-orange-500': 'linear-gradient(135deg, #DC2626, #EF4444, #F97316)',
        'from-amber-600 via-yellow-500 to-orange-600': 'linear-gradient(135deg, #D97706, #EAB308, #EA580C)',
        'from-sky-300 via-blue-200 to-cyan-300': 'linear-gradient(135deg, #87CEEB, #BFDBFE, #06B6D4)',
        'from-amber-900 via-orange-700 to-orange-600': 'linear-gradient(135deg, #78350F, #B45309, #EA580C)',
        'from-yellow-500 via-yellow-400 to-amber-400': 'linear-gradient(135deg, #EAB308, #FACC15, #FBBF24)',
        'from-yellow-500 via-green-400 to-emerald-500': 'linear-gradient(135deg, #EAB308, #4ADE80, #10B981)',
        'from-red-500 to-red-400': 'linear-gradient(135deg, #EF4444, #F87171)',
        'from-yellow-400 to-amber-400': 'linear-gradient(135deg, #FACC15, #FBBF24)',
        'from-sky-300 to-blue-300': 'linear-gradient(135deg, #87CEEB, #93C5FD)',
        'from-orange-500 to-amber-400': 'linear-gradient(135deg, #F97316, #FBBF24)',
        'from-yellow-400 to-green-400': 'linear-gradient(135deg, #FACC15, #4ADE80)',
      }

      for (const [key, value] of Object.entries(gradients)) {
        if (gradient === key) return value
      }

      return 'linear-gradient(135deg, #EC4899, #F472B6)'
    }

    // Helper function to generate glow box shadow from gradient
    function getGlowBoxShadow(gradient: string): string {
      if (gradient.includes('red')) return 'rgba(239, 68, 68, 0.5)'
      if (gradient.includes('yellow')) return 'rgba(234, 179, 8, 0.5)'
      if (gradient.includes('sky') || gradient.includes('blue')) return 'rgba(135, 206, 235, 0.4)'
      if (gradient.includes('orange')) return 'rgba(249, 115, 22, 0.5)'
      if (gradient.includes('green')) return 'rgba(74, 222, 128, 0.5)'

      return 'rgba(236, 72, 153, 0.4)'
    }





