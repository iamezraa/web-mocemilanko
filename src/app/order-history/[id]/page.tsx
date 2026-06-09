'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useOrder } from '@/context/OrderContext'
import { useAdmin } from '@/context/AdminContext'
import { Order } from '@/types/order'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated, isLoading: adminLoading } = useAdmin()
  const { loading, error, fetchOrderById, updateOrderStatus } = useOrder()
  const [order, setOrder] = useState<Order | null>(null)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  // Check authentication
  useEffect(() => {
    if (!adminLoading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [adminLoading, isAuthenticated, router])

  useEffect(() => {
    const loadOrder = async () => {
      const result = await fetchOrderById(params.id)
      setOrder(result)
    }
    loadOrder()
  }, [params.id, fetchOrderById])

  const handleUpdateStatus = async (newStatus: string) => {
    if (confirm(`Ubah status menjadi "${newStatus}"?`)) {
      setIsUpdatingStatus(true)
      const updated = await updateOrderStatus(params.id, newStatus)
      if (updated) {
        setOrder(updated)
      }
      setIsUpdatingStatus(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    if (!order) return

    const receiptContent = generateReceiptContent(order)
    const printWindow = window.open('', '', 'width=800,height=600')
    if (printWindow) {
      printWindow.document.write(receiptContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Sent to WhatsApp':
        return 'bg-blue-100 text-blue-800'
      case 'Confirmed':
        return 'bg-purple-100 text-purple-800'
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="text-center">
          <p className="text-4xl mb-4">⏳</p>
          <p className="text-gray-600 font-semibold">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">⏳</p>
            <p className="text-gray-600 font-semibold">Memuat detail pesanan...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 shadow-lg text-center border-2 border-red-300"
            >
              <p className="text-4xl mb-4">❌</p>
              <p className="text-red-600 font-semibold text-lg mb-6">{error || 'Pesanan tidak ditemukan'}</p>
              <Link
                href="/admin/orders"
                className="inline-block bg-gradient-to-r from-basreng-orange to-basreng-red text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all"
              >
                Kembali ke Riwayat
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">
                📋 Detail Pesanan
              </h1>
              <p className="text-gray-600">{order.orderId}</p>
            </div>
            <Link
              href="/admin/orders"
              className="bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-gray-400 transition-all"
            >
              ← Kembali
            </Link>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-6 text-white ${getStatusColor(order.status).replace('text-', 'text-').replace('bg-', 'bg-').includes('100') ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-basreng-orange to-basreng-red'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Status Pesanan</p>
                    <p className="text-2xl font-bold">{order.status}</p>
                  </div>
                  <p className="text-5xl">📊</p>
                </div>
              </motion.div>

              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 Informasi Pelanggan</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama:</span>
                    <span className="font-bold text-gray-900">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">WhatsApp:</span>
                    <span className="font-bold text-gray-900">{order.whatsappNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alamat:</span>
                    <span className="font-bold text-gray-900 text-right max-w-xs">{order.address}</span>
                  </div>
                  {order.notes && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Catatan:</span>
                      <span className="font-bold text-gray-900 text-right max-w-xs">{order.notes}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Item Pesanan</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.flavor}`}
                      className="flex justify-between items-center pb-4 border-b-2 border-gray-200 last:border-b-0"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">{item.flavor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">x{item.quantity}</p>
                        <p className="font-bold text-basreng-orange">
                          Rp{item.totalPrice.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Receipt Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🧾 Informasi Struk</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">No. Struk:</span>
                    <span className="font-mono font-bold text-basreng-orange">{order.receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal Pesanan:</span>
                    <span className="font-bold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('id-ID')} {' '}
                      {new Date(order.createdAt).toLocaleTimeString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Update Terakhir:</span>
                    <span className="font-bold text-gray-900">
                      {new Date(order.updatedAt).toLocaleDateString('id-ID')} {' '}
                      {new Date(order.updatedAt).toLocaleTimeString('id-ID')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Total */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white rounded-2xl p-6 shadow-lg sticky top-4"
              >
                <p className="text-sm opacity-90 mb-2">Total Pesanan</p>
                <p className="text-4xl font-black mb-6">
                  Rp{order.totalPrice.toLocaleString('id-ID')}
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full bg-white text-basreng-orange font-bold py-3 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                  >
                    📥 Download PDF
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full bg-white bg-opacity-20 text-white font-bold py-3 rounded-lg hover:bg-opacity-30 transition-all flex items-center justify-center gap-2"
                  >
                    🖨️ Cetak
                  </button>
                  <a
                    href={`https://wa.me/6282145661716?text=${encodeURIComponent(`Halo, saya ingin konfirmasi pesanan ${order.orderId}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white bg-opacity-20 text-white font-bold py-3 rounded-lg hover:bg-opacity-30 transition-all flex items-center justify-center gap-2"
                  >
                    💬 Hubungi via WhatsApp
                  </a>
                </div>
              </motion.div>

              {/* Status Update (Admin) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-3">⚙️ Update Status</h3>
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  disabled={isUpdatingStatus}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors font-bold text-sm disabled:opacity-50"
                >
                  <option value="Pending">Pending</option>
                  <option value="Sent to WhatsApp">Sent to WhatsApp</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </motion.div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200"
              >
                <p className="text-xs text-blue-600 leading-relaxed">
                  ℹ️ <span className="font-bold">Catatan:</span> Pesanan Anda telah disimpan dalam sistem kami. Silakan hubungi melalui WhatsApp untuk konfirmasi dan informasi lebih lanjut tentang pengiriman.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function generateReceiptContent(order: Order): string {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Struk Pesanan - ${order.orderId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', monospace; line-height: 1.5; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px dashed #ccc; padding-bottom: 20px; }
        .header h1 { font-size: 24px; margin-bottom: 5px; }
        .header p { font-size: 12px; color: #666; }
        .section { margin-bottom: 20px; border-bottom: 2px dashed #ccc; padding-bottom: 20px; }
        .section-title { font-weight: bold; margin-bottom: 10px; }
        .row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .items { margin-bottom: 10px; }
        .item { margin-bottom: 10px; }
        .item-name { font-weight: bold; }
        .item-detail { font-size: 12px; color: #666; margin-left: 10px; }
        .total { font-size: 18px; font-weight: bold; text-align: right; }
        .footer { text-align: center; font-size: 12px; color: #666; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MOCEMILANKO SNACK</h1>
          <p>Banyak Rasa, Banyak Cerita!</p>
          <p>Kota Kupang, NTT</p>
        </div>

        <div class="section">
          <div class="section-title">ORDER INFORMATION</div>
          <div class="row">
            <span>Order ID:</span>
            <span>${order.orderId}</span>
          </div>
          <div class="row">
            <span>Receipt #:</span>
            <span>${order.receiptNumber}</span>
          </div>
          <div class="row">
            <span>Date:</span>
            <span>${new Date(order.createdAt).toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">ITEMS ORDERED</div>
          <div class="items">
            ${order.items
              .map(
                (item) => `
            <div class="item">
              <div class="item-name">${item.productName}</div>
              <div class="item-detail">
                ${item.flavor} x${item.quantity} = Rp${item.totalPrice.toLocaleString('id-ID')}
              </div>
            </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="section">
          <div class="row">
            <span>TOTAL:</span>
            <span class="total">Rp${order.totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">CUSTOMER INFORMATION</div>
          <div class="row">
            <span>Name:</span>
            <span>${order.customerName}</span>
          </div>
          <div class="row">
            <span>WhatsApp:</span>
            <span>${order.whatsappNumber}</span>
          </div>
          <div class="row">
            <span>Address:</span>
            <span>${order.address}</span>
          </div>
          ${order.notes ? `<div class="row"><span>Notes:</span><span>${order.notes}</span></div>` : ''}
        </div>

        <div class="footer">
          <p>Thank you for your order!</p>
          <p>Status: ${order.status}</p>
        </div>
      </div>
    </body>
    </html>
  `
}
