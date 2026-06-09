'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useOrder } from '@/context/OrderContext'
import { useAdmin } from '@/context/AdminContext'
import { OrderStatus } from '@/types/order'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { OrderHistorySkeleton } from '@/components/OrderHistorySkeleton'

const orderStatuses: OrderStatus[] = ['Pending', 'Sent to WhatsApp', 'Confirmed', 'Completed', 'Cancelled']

export default function AdminOrdersPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading: adminLoading } = useAdmin()
  const { orders, loading, error, fetchOrders } = useOrder()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  // Check authentication first
  useEffect(() => {
    if (!adminLoading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [adminLoading, isAuthenticated, router])

  // Fetch orders once on mount
  useEffect(() => {
    if (isAuthenticated && !hasLoadedOnce) {
      fetchOrders()
      setHasLoadedOnce(true)
    }
  }, [isAuthenticated, hasLoadedOnce, fetchOrders])

  // Handle filter changes without causing refetch on mount
  const applyFilters = useCallback(() => {
    const params: any = {}
    if (searchTerm.trim()) params.searchTerm = searchTerm
    if (statusFilter !== 'All') params.status = statusFilter
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate
    // This would call the API if implemented, for now it filters client-side
  }, [searchTerm, statusFilter, startDate, endDate])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  // Filter orders client-side
  const filteredOrders = orders.filter((order) => {
    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      const matchesSearch =
        order.orderId.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.whatsappNumber.includes(term)
      if (!matchesSearch) return false
    }

    // Status filter
    if (statusFilter !== 'All' && order.status !== statusFilter) {
      return false
    }

    // Date range filter
    const orderDate = new Date(order.createdAt)
    if (startDate) {
      const start = new Date(startDate)
      if (orderDate < start) return false
    }
    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      if (orderDate > end) return false
    }

    return true
  })

  // Sort orders
  const sortedOrders = sortOrder === 'oldest' 
    ? [...filteredOrders].reverse() 
    : filteredOrders

  const getStatusColor = (status: OrderStatus) => {
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

  // Show loading state while checking authentication
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

  // Redirect if not authenticated happens in useEffect, but show this just in case
  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
              📊 Manajemen Pesanan
            </h1>
            <p className="text-gray-600">Kelola semua pesanan pelanggan dan lihat detail lengkapnya</p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg mb-8 border-2 border-gray-100"
          >
            <div className="space-y-4">
              {/* Search Bar */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  🔍 Cari Pesanan
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Cari by Order ID, Nama, atau Nomor WhatsApp..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                />
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                  >
                    <option value="All">Semua</option>
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Dari Tanggal
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Sampai Tanggal
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Urutan
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors"
                  >
                    <option value="newest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {sortedOrders.length} dari {orders.length} pesanan
              </div>
            </div>
          </motion.div>

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

          {/* Orders List */}
          {loading && !hasLoadedOnce ? (
            <OrderHistorySkeleton />
          ) : sortedOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 shadow-lg text-center border-2 border-gray-100"
            >
              <p className="text-4xl mb-4">📭</p>
              <p className="text-gray-600 font-semibold text-lg mb-4">Belum ada pesanan</p>
              <p className="text-gray-500">Pesanan pelanggan akan muncul di sini</p>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {sortedOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-basreng-orange transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      {/* Order Info */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Order #{order.orderId}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <span className={`px-4 py-2 rounded-full font-bold text-sm border-2 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-600">📞 {order.whatsappNumber}</p>
                    </div>

                    {/* Items Preview */}
                    <div className="mb-4">
                      <p className="font-bold text-gray-900 mb-2">Produk ({order.items.length}):</p>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item) => (
                          <p key={`${item.productId}-${item.flavor}`} className="text-sm text-gray-600">
                            • {item.productName} ({item.flavor}) x{item.quantity}
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-gray-500 italic">
                            +{order.items.length - 2} produk lainnya
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Total and View Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Total:</p>
                        <p className="text-2xl font-bold text-basreng-orange">
                          Rp{order.totalPrice.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <Link
                        href={`/order-history/${order.id}`}
                        className="bg-gradient-to-r from-basreng-orange to-basreng-red text-white font-bold py-2 px-6 rounded-lg hover:shadow-lg transition-all"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
