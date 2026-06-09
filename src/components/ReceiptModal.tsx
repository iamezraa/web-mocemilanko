'use client'

import { motion } from 'framer-motion'
import { Order } from '@/types/order'
import Link from 'next/link'

interface ReceiptModalProps {
  order: Order
  onClose: () => void
  onComplete: () => void
}

export default function ReceiptModal({
  order,
  onClose,
  onComplete,
}: ReceiptModalProps) {
  const handleWhatsAppCheckout = () => {
    try {
      // Format order summary for WhatsApp
      const orderSummary = order.items
        .map((item) => `- ${item.productName} ${item.flavor} x${item.quantity} = Rp${item.totalPrice.toLocaleString('id-ID')}`)
        .join('\n')

      // Build message with proper formatting
      const messageText = `Halo Mocemilanko! 🎉\n\nSaya ingin melakukan pemesanan:\n\nOrder ID: ${order.orderId}\nReceipt Number: ${order.receiptNumber}\n\nItems:\n${orderSummary}\n\nTotal: Rp${order.totalPrice.toLocaleString('id-ID')}\n\nCustomer:\nNama: ${order.customerName}\nNo. WhatsApp: ${order.whatsappNumber}\nAlamat: ${order.address}${order.notes ? `\nCatatan: ${order.notes}` : ''}\n\nTerimakasih!`

      // Proper URL encoding
      const whatsappNumber = '6282145661716'
      const encodedMessage = encodeURIComponent(messageText)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      // Try to redirect - this works better than window.open() on all devices
      if (typeof window !== 'undefined') {
        // First, complete the order
        onComplete()
        
        // Then redirect to WhatsApp
        setTimeout(() => {
          window.location.href = whatsappUrl
        }, 500)
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error)
      alert('Gagal membuka WhatsApp. Silakan coba lagi.')
    }
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
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white p-8 text-center sticky top-0 z-10">
          <h2 className="text-4xl font-black">✅ Struk Pesanan</h2>
          <p className="text-white text-opacity-90 mt-2">Digital Receipt</p>
        </div>

        {/* Receipt Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
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
                <span className="font-bold text-basreng-orange">{order.orderId}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Receipt #:</span>
                <span className="font-bold text-basreng-orange">{order.receiptNumber}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Date:</span>
                <span>{new Date(order.createdAt).toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6 pb-6 border-b-2 border-dashed border-gray-400">
              <p className="font-bold mb-3 text-gray-900">ITEMS:</p>
              <div className="space-y-2">
                {order.items.map((item) => (
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
                <span className="text-basreng-orange">Rp{order.totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-6">
              <p className="font-bold mb-3 text-gray-900">CUSTOMER:</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Nama:</span>
                  <span>{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp:</span>
                  <span>{order.whatsappNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alamat:</span>
                  <span className="text-right max-w-xs">{order.address}</span>
                </div>
                {order.notes && (
                  <div className="flex justify-between">
                    <span>Catatan:</span>
                    <span className="text-right max-w-xs">{order.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-6 border-t-2 border-dashed border-gray-400">
              <p className="text-xs text-gray-600">Terima kasih telah berbelanja!</p>
              <p className="text-xs text-gray-600 mt-1">Mohon konfirmasi pesanan via WhatsApp</p>
              <p className="text-xs text-gray-600 mt-2">Status: <span className="font-bold text-basreng-orange">{order.status}</span></p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons - Sticky Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-3 p-6 border-t-2 border-gray-200 bg-white sticky bottom-0 z-20"
        >
          <motion.button
            onClick={handleWhatsAppCheckout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            💬 Kirim via WhatsApp
          </motion.button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-400 transition-all"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
