'use client'

import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { CheckoutData } from './CheckoutModal'

interface ReceiptModalProps {
  orderId: string
  checkoutData: CheckoutData
  onClose: () => void
  onComplete: () => void
}

export default function ReceiptModal({
  orderId,
  checkoutData,
  onClose,
  onComplete,
}: ReceiptModalProps) {
  const { items, totalPrice } = useCart()

  const handleWhatsAppCheckout = () => {
    // Format order summary for WhatsApp
    const orderSummary = items
      .map((item) => `- ${item.productName} ${item.flavor} x${item.quantity} = Rp${item.totalPrice.toLocaleString('id-ID')}`)
      .join('%0A')

    const message = `Halo Mocemilanko! 🎉%0A%0ASaya ingin melakukan pemesanan:%0A%0AOrder ID: ${orderId}%0A%0AItems:%0A${orderSummary}%0A%0ATotal: Rp${totalPrice.toLocaleString('id-ID')}%0A%0ACustomer:%0ANama: ${checkoutData.name}%0AAlamat: ${checkoutData.address}${checkoutData.notes ? `%0ACatatan: ${checkoutData.notes}` : ''}%0A%0ATerimakasih!`

    const whatsappNumber = '6282145661716'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    window.open(whatsappUrl, '_blank')
    onComplete()
  }

  return (
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
        <div className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white p-8 text-center sticky top-0 z-10">
          <h2 className="text-4xl font-black">✅ Struk Pesanan</h2>
          <p className="text-white text-opacity-90 mt-2">Digital Receipt</p>
        </div>

        {/* Receipt Content */}
        <div className="p-8">
          {/* Receipt Paper Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-white to-gray-50 border-4 border-dashed border-gray-400 rounded-xl p-8 font-mono text-sm"
          >
            {/* Logo & Title */}
            <div className="text-center mb-6 pb-6 border-b-2 border-dashed border-gray-400">
              <p className="text-3xl mb-2">🌶️🧀🌽</p>
              <p className="text-xl font-bold text-gray-900">MOCEMILANKO SNACK</p>
              <p className="text-xs text-gray-600 mt-1">Banyak Rasa, Banyak Cerita!</p>
              <p className="text-xs text-gray-600">Kota Kupang, NTT</p>
            </div>

            {/* Order Info */}
            <div className="mb-6 pb-6 border-b-2 border-dashed border-gray-400">
              <div className="flex justify-between mb-2">
                <span>Order ID:</span>
                <span className="font-bold text-basreng-orange">{orderId}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Date:</span>
                <span>{new Date().toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6 pb-6 border-b-2 border-dashed border-gray-400">
              <p className="font-bold mb-3 text-gray-900">ITEMS:</p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.flavor}`}>
                    <div className="flex justify-between">
                      <span>{item.productName}</span>
                      <span>x{item.quantity}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 ml-2">
                      <span>{item.flavor}</span>
                      <span>Rp{item.totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mb-6 pb-6 border-b-2 border-dashed border-gray-400">
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>TOTAL:</span>
                <span className="text-basreng-orange">Rp{totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-6">
              <p className="font-bold mb-3 text-gray-900">CUSTOMER:</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Nama:</span>
                  <span>{checkoutData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp:</span>
                  <span>{checkoutData.whatsappNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alamat:</span>
                  <span className="text-right max-w-xs">{checkoutData.address}</span>
                </div>
                {checkoutData.notes && (
                  <div className="flex justify-between">
                    <span>Catatan:</span>
                    <span className="text-right max-w-xs">{checkoutData.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-6 border-t-2 border-dashed border-gray-400">
              <p className="text-xs text-gray-600">Terima kasih telah berbelanja!</p>
              <p className="text-xs text-gray-600 mt-1">Mohon konfirmasi pesanan via WhatsApp</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 mt-8 pt-6 border-t-2 border-gray-200"
          >
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
            >
              Kembali
            </button>
            <motion.button
              onClick={handleWhatsAppCheckout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              💬 Kirim via WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
