'use client'

import { useAdmin } from '@/context/AdminContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/admin/dashboard')
      } else {
        router.push('/admin/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl mb-4">⏳</p>
        <p className="text-gray-600 font-semibold">Redirecting...</p>
      </div>
    </div>
  )
}
