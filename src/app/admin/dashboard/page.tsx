'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useOrder } from '@/context/OrderContext'
import { Order } from '@/types/order'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function AdminDashboardContent() {
  const { orders, stats, loading, error, fetchOrders, fetchStats } = useOrder()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchOrders(), fetchStats()])
      setIsLoadingStats(false)
    }
    loadData()
  }, [fetchOrders, fetchStats])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Sent to WhatsApp':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Confirmed':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
              📊 Admin Dashboard
            </h1>
            <p className="text-gray-600">Kelola semua pesanan dan pantau bisnis Anda</p>
          </motion.div>

          {/* Stats Grid */}
          {isLoadingStats ? (
            <div className="text-center py-12">
              <p className="text-2xl mb-4">⏳</p>
              <p className="text-gray-600 font-semibold">Memuat data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200"
              >
                <p className="text-gray-600 text-sm font-bold mb-2">TOTAL PESANAN</p>
                <p className="text-4xl font-black text-blue-600 mb-1">
                  {stats?.totalOrders || 0}
                </p>
                <p className="text-xs text-gray-500">📦 Semua waktu</p>
              </motion.div>

              {/* Total Revenue */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200"
              >
                <p className="text-gray-600 text-sm font-bold mb-2">TOTAL REVENUE</p>
                <p className="text-2xl font-black text-green-600 mb-1">
                  Rp{(stats?.totalRevenue || 0).toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-gray-500">💰 Semua waktu</p>
              </motion.div>

              {/* Most Ordered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200"
              >
                <p className="text-gray-600 text-sm font-bold mb-2">PRODUK TERLARIS</p>
                <p className="text-sm font-bold text-orange-600 truncate mb-1">
                  {stats?.mostOrderedProduct}
                </p>
                <p className="text-xs text-gray-500">🏆 Produk populer</p>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200"
              >
                <p className="text-gray-600 text-sm font-bold mb-2">PESANAN HARI INI</p>
                <p className="text-4xl font-black text-purple-600 mb-1">
                  {stats?.recentOrders.filter(
                    (o) =>
                      new Date(o.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
                <p className="text-xs text-gray-500">📅 Hari ini</p>
              </motion.div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border-2 border-red-300 text-red-800 p-4 rounded-lg mb-8"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Recent Orders List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📋 Pesanan Terbaru
              </h2>

              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Memuat...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-semibold mb-4">Belum ada pesanan</p>
                  <Link
                    href="/admin/orders"
                    className="text-basreng-orange font-bold hover:underline"
                  >
                    Lihat riwayat pesanan →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 10).map((order) => (
                    <motion.div
                      key={order.id}
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedOrder(order)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-basreng-orange hover:bg-orange-50 cursor-pointer transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{order.orderId}</p>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full font-bold text-xs border-2 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('id-ID')}
                        </p>
                        <p className="font-bold text-basreng-orange">
                          Rp{order.totalPrice.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <Link
                href="/admin/orders"
                className="block mt-6 text-center bg-gradient-to-r from-basreng-orange to-basreng-red text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Lihat Semua Pesanan →
              </Link>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Aksi Cepat</h3>
                <div className="space-y-3">
                  <Link
                    href="/admin/orders"
                    className="block bg-gradient-to-r from-basreng-orange to-basreng-red text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all text-center"
                  >
                    📋 Lihat Semua Pesanan
                  </Link>
                  <Link
                    href="/"
                    className="block bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all text-center"
                  >
                    🏠 Kembali ke Beranda
                  </Link>
                </div>
              </div>

              {/* Selected Order Details */}
              {selectedOrder && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-basreng-orange">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📍 Detail Pesanan</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-bold text-gray-600">Order:</span>{' '}
                      {selectedOrder.orderId}
                    </p>
                    <p>
                      <span className="font-bold text-gray-600">Pelanggan:</span>{' '}
                      {selectedOrder.customerName}
                    </p>
                    <p>
                      <span className="font-bold text-gray-600">Status:</span>{' '}
                      <span className={`px-2 py-1 rounded-full font-bold text-xs border ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold text-gray-600">Total:</span>{' '}
                      <span className="text-basreng-orange font-bold">
                        Rp{selectedOrder.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold text-gray-600">Items:</span>{' '}
                      {selectedOrder.items.length} produk
                    </p>
                  </div>
                  <Link
                    href={`/order-history/${selectedOrder.orderId}`}
                    className="block mt-4 text-center bg-basreng-orange text-white font-bold py-2 rounded-lg hover:bg-orange-700 transition-all"
                  >
                    Lihat Detail Lengkap
                  </Link>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200">
                <p className="text-xs text-yellow-700 leading-relaxed">
                  <span className="font-bold">💡 Catatan:</span> Data pesanan disimpan otomatis saat checkout. Semua transaksi tercatat dalam sistem ini.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="super_admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
