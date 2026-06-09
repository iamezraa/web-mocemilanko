'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { Order, OrderFilters, OrderStats, OrderFormData } from '@/types/order'

export interface OrderContextType {
  orders: Order[]
  currentOrder: Order | null
  stats: OrderStats | null
  loading: boolean
  error: string | null
  fetchOrders: (filters?: OrderFilters) => Promise<void>
  fetchOrderById: (orderId: string) => Promise<Order | null>
  createOrder: (data: OrderFormData, items: any[], totalPrice: number) => Promise<Order | null>
  updateOrderStatus: (orderId: string, status: string) => Promise<Order | null>
  fetchStats: () => Promise<void>
  searchOrders: (term: string) => Promise<void>
  clearError: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [stats, setStats] = useState<OrderStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const fetchOrders = useCallback(async (filters?: OrderFilters) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (filters?.searchTerm) params.append('search', filters.searchTerm)
      if (filters?.status) params.append('status', filters.status)
      if (filters?.startDate) params.append('startDate', filters.startDate)
      if (filters?.endDate) params.append('endDate', filters.endDate)

      const response = await fetch(`/api/orders?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch orders')

      const data = await response.json()
      setOrders(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching orders'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchOrderById = useCallback(async (orderId: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) throw new Error('Order not found')

      const data = await response.json()
      setCurrentOrder(data)
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching order'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createOrder = useCallback(
    async (data: OrderFormData, items: any[], totalPrice: number) => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: data.name,
            whatsappNumber: data.whatsappNumber,
            address: data.address,
            notes: data.notes,
            items,
            totalPrice,
          }),
        })

        if (!response.ok) throw new Error('Failed to create order')

        const newOrder = await response.json()
        setCurrentOrder(newOrder)
        setOrders((prev) => [newOrder, ...prev])
        return newOrder
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error creating order'
        setError(message)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('Failed to update order')

      const updatedOrder = await response.json()
      setCurrentOrder(updatedOrder)
      setOrders((prev) =>
        prev.map((order) => (order.orderId === orderId ? updatedOrder : order))
      )
      return updatedOrder
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating order'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/orders/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')

      const data = await response.json()
      setStats(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching stats'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchOrders = useCallback(async (term: string) => {
    await fetchOrders({ searchTerm: term })
  }, [fetchOrders])

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        stats,
        loading,
        error,
        fetchOrders,
        fetchOrderById,
        createOrder,
        updateOrderStatus,
        fetchStats,
        searchOrders,
        clearError,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within OrderProvider')
  }
  return context
}
