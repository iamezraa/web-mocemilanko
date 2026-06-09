'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'

export default function OrderHistoryPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAdmin()

  useEffect(() => {
    if (!isLoading) {
      // If authenticated admin, redirect to admin orders page
      if (isAuthenticated) {
        router.push('/admin/orders')
      } else {
        // If not authenticated, redirect to home
        router.push('/')
      }
    }
  }, [isLoading, isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="text-center">
        <p className="text-4xl mb-4">⏳</p>
        <p className="text-gray-600 font-semibold">Redirecting...</p>
      </div>
    </div>
  )
}


