'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalPrice, totalItems, removeItem, updateQuantity } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Cart Drawer */}
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">🛒 Keranjang Belanja</h2>
                <button
                  onClick={onClose}
                  className="text-2xl font-bold hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-3xl mb-4">🛍️</p>
                    <p className="text-gray-600 font-semibold">Keranjang masih kosong!</p>
                    <p className="text-sm text-gray-500 mt-2">Tambahkan produk untuk memulai</p>
                  </div>
                ) : (
                  items.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${item.flavor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 hover:border-basreng-orange transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{item.productName}</h4>
                          <p className="text-sm text-basreng-orange font-semibold">{item.flavor}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.flavor)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-white border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.flavor, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.flavor, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Rp{item.price.toLocaleString('id-ID')}</p>
                          <p className="font-bold text-gray-900">Rp{item.totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Summary and Checkout */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t-2 border-gray-200 p-6 space-y-4 bg-gray-50"
                >
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Total Item:</span>
                      <span className="font-bold">{totalItems} produk</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-basreng-orange">Rp{totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-gradient-to-r from-basreng-orange to-basreng-red text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
                  >
                    Lanjut ke Checkout 🛒
                  </motion.button>

                  <button
                    onClick={onClose}
                    className="w-full bg-gray-300 text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-400 transition-all"
                  >
                    Lanjut Belanja
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <CheckoutModal
          onClose={() => setIsCheckingOut(false)}
          onCheckoutComplete={() => {
            setIsCheckingOut(false)
            onClose()
          }}
        />
      )}
    </>
  )
}
