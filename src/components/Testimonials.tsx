'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  name: string
  avatar: string
  role: string
  content: string
  flavor: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Siti Nurhaliza',
    avatar: '👩',
    role: 'Jakarta',
    content: 'Mocemilanko Basreng Pedas terbaik! Rasa pedas yang pas, gurih, dan super addictive. Sudah order berkali-kali! 🔥',
    flavor: 'Basreng Pedas',
    rating: 5,
  },
  {
    id: '2',
    name: 'Budi Hartono',
    avatar: '👨',
    role: 'Surabaya',
    content:
      'Mie Lidi Balado-nya mantap! Rasa tradisional yang authentic. Ini cemilan pilihan saya setiap weekend. Recommended! 👍',
    flavor: 'Balado',
    rating: 5,
  },
  {
    id: '3',
    name: 'Rina Putri',
    avatar: '👩',
    role: 'Bandung',
    content: 'Yang paling saya suka adalah Keju-nya! Gurih, creamy, dan bikin ketagihan. Porsinya juga pas! 🧀✨',
    flavor: 'Keju',
    rating: 5,
  },
  {
    id: '4',
    name: 'Ahmad Wijaya',
    avatar: '👨',
    role: 'Medan',
    content:
      'Semua rasa udah saya coba dan semuanya bagus! Tapi Jagung Bakar-nya paling favorit. Manis gurih sempurna! 🌽😋',
    flavor: 'Jagung Bakar',
    rating: 5,
  },
  {
    id: '5',
    name: 'Devi Kusuma',
    avatar: '👩',
    role: 'Yogyakarta',
    content:
      'Pengiriman cepat, packaging bagus, dan cemilan-nya super fresh! Mocemilanko adalah choice terbaik untuk cemilan berkualitas. ⭐⭐⭐⭐⭐',
    flavor: 'Original Asin',
    rating: 5,
  },
  {
    id: '6',
    name: 'Ricky Gunawan',
    avatar: '👨',
    role: 'Semarang',
    content:
      'BBQ-nya enak banget! Rasa smoky yang kaya dan berani. Ini cemilan yang tepat untuk adventure. Mantap! 🔥👏',
    flavor: 'Barbeque',
    rating: 5,
  },
]

export default function Testimonials() {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Apa Kata Mereka? 💬
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ribuan pelanggan senang sudah merasakan kepuasan ngemil bersama Mocemilanko. Ini testimoni mereka!
          </p>
        </motion.div>

        {/* Desktop - Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-basreng-orange hover:shadow-xl transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-2xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>

              {/* User info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div className="flex-grow">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <div className="text-sm bg-gradient-to-r from-basreng-orange to-basreng-red text-white px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                  {testimonial.flavor}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile - Carousel-like */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:hidden"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-basreng-orange mb-4"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>

              {/* User info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div className="flex-grow">
                  <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="text-xs bg-gradient-to-r from-basreng-orange to-basreng-red text-white px-3 py-1 rounded-full font-semibold mt-4 inline-block">
                {testimonial.flavor}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-orange-200">
            <p className="text-4xl mb-2">😍</p>
            <p className="font-bold text-gray-900 text-lg">100%</p>
            <p className="text-gray-600 text-sm">Pelanggan Satisfied</p>
          </div>

          <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl p-6 border border-green-200">
            <p className="text-4xl mb-2">🚀</p>
            <p className="font-bold text-gray-900 text-lg">1000+</p>
            <p className="text-gray-600 text-sm">Pesanan Sukses</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <p className="text-4xl mb-2">⭐</p>
            <p className="font-bold text-gray-900 text-lg">4.9/5</p>
            <p className="text-gray-600 text-sm">Rating Average</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 border border-red-200">
            <p className="text-4xl mb-2">❤️</p>
            <p className="font-bold text-gray-900 text-lg">Growing</p>
            <p className="text-gray-600 text-sm">Loyal Customers</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
