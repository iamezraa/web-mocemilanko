'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const { login, isLoading, error, isAuthenticated } = useAdmin()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/admin/dashboard')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!username || !password) {
      setLocalError('Username dan password harus diisi')
      return
    }

    const success = await login(username, password)
    if (success) {
      router.push('/admin/dashboard')
    } else {
      setLocalError(error || 'Login gagal')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-gradient-to-r from-basreng-orange to-basreng-red"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl mb-4"
            >
              🔐
            </motion.div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Mocemilanko Management</p>
          </div>

          {/* Error Message */}
          {(localError || error) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border-2 border-red-300 text-red-800 p-4 rounded-lg mb-6"
            >
              <p className="font-bold">⚠️ {localError || error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-bold text-gray-900 mb-2">
                👤 Username / Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username atau email"
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors disabled:bg-gray-100"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-bold text-gray-900 mb-2">
                🔑 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-basreng-orange focus:outline-none transition-colors disabled:bg-gray-100"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-basreng-orange to-basreng-red text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span> Login...
                </>
              ) : (
                <>
                  🚀 Login ke Admin Panel
                </>
              )}
            </motion.button>
          </form>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Link
              href="/"
              className="text-basreng-orange font-bold hover:underline flex items-center justify-center gap-2"
            >
              ← Kembali ke Beranda
            </Link>
          </motion.div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4"
        >
          <p className="text-xs text-blue-700 leading-relaxed">
            <span className="font-bold">🔒 Catatan Keamanan:</span> Halaman ini hanya untuk administrator resmi Mocemilanko. Jangan bagikan kredensial login Anda kepada siapa pun. Selalu logout setelah selesai.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
