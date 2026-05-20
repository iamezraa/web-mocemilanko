'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import ReceiptModal from './ReceiptModal'

interface CheckoutModalProps {
  onClose: () => void
  onCheckoutComplete: () => void
}

export interface CheckoutData {
  name: string
  whatsappNumber: string
  address: string
  notes: string
}

export default function CheckoutModal({ onClose, onCheckoutComplete }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    whatsappNumber: '',
    address: '',
    notes: '',
  })
  const [showReceipt, setShowReceipt] = useState(false)
  const [orderId, setOrderId] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-6)
    return `MC-${timestamp}`
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.whatsappNumber || !formData.address) {
      alert('Mohon isi semua field yang diperlukan!')
      return
    }

    // Validate and clean WhatsApp number
    const cleanedNumber = formData.whatsappNumber.replace(/\D/g, '')
    if (cleanedNumber.length < 10) {
      alert('Nomor WhatsApp tidak valid!')
      return
    }

    // Generate order ID
    const newOrderId = generateOrderId()
    setOrderId(newOrderId)

    // Update form data with cleaned number
    setFormData((prev) => ({
      ...prev,
      whatsappNumber: cleanedNumber,
    }))

    // Show receipt
    setShowReceipt(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white p-8 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black">📋 Checkout</h2>
              <button
                onClick={onClose}
                className="text-3xl font-bold hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-orange-50 border-2 border-basreng-orange rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg mb-4 text-gray-900">📦 Ringkasan Pesanan</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.flavor}`} className="flex justify-between text-gray-700">
                    <span>
                      {item.productName} ({item.flavor}) x{item.quantity}
                    </span>
                    <span className="font-bold">Rp{item.totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-basreng-orange mt-4 pt-4 flex justify-between text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-basreng-orange">Rp{totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleCheckout} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="Contoh: 6282145661716 (tanpa spasi/dash)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Alamat Pengiriman <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Masukkan alamat lengkap untuk pengiriman"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Catatan Pesanan (Opsional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Misal: jangan terlalu pedas, tanpa packaging, dll"
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                />
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4 pt-6 border-t-2 border-gray-200"
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Batal
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-basreng-orange to-basreng-red text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Lanjut ke Struk 📄
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>

      {/* Receipt Modal */}
      {showReceipt && (
        <ReceiptModal
          orderId={orderId}
          checkoutData={formData}
          onClose={() => {
            setShowReceipt(false)
            onClose()
          }}
          onComplete={() => {
            clearCart()
            setShowReceipt(false)
            onCheckoutComplete()
          }}
        />
      )}
    </>
  )
}
