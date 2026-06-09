import * as fs from 'fs'
import * as path from 'path'
import { Order, OrderStatus, OrderFilters, OrderStats } from '@/types/order'

const DATA_DIR = path.join(process.cwd(), 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

// Ensure data directory exists
export function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// Load all orders from file
export function loadOrders(): Order[] {
  try {
    ensureDataDir()
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error loading orders:', error)
    return []
  }
}

// Save orders to file
export function saveOrders(orders: Order[]): boolean {
  try {
    ensureDataDir()
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error saving orders:', error)
    return false
  }
}

// Add new order
export function addOrder(order: Order): Order | null {
  try {
    const orders = loadOrders()
    orders.push(order)
    if (saveOrders(orders)) {
      return order
    }
    return null
  } catch (error) {
    console.error('Error adding order:', error)
    return null
  }
}

// Get order by ID
export function getOrderById(orderId: string): Order | null {
  try {
    const orders = loadOrders()
    return orders.find((order) => order.orderId === orderId) || null
  } catch (error) {
    console.error('Error getting order:', error)
    return null
  }
}

// Get all orders
export function getAllOrders(): Order[] {
  return loadOrders()
}

// Search orders
export function searchOrders(filters: OrderFilters): Order[] {
  try {
    let orders = loadOrders()

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      orders = orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(term) ||
          order.customerName.toLowerCase().includes(term) ||
          order.whatsappNumber.includes(term) ||
          order.receiptNumber.toLowerCase().includes(term)
      )
    }

    if (filters.status) {
      orders = orders.filter((order) => order.status === filters.status)
    }

    if (filters.startDate) {
      const startDate = new Date(filters.startDate).getTime()
      orders = orders.filter((order) => new Date(order.createdAt).getTime() >= startDate)
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate).getTime()
      orders = orders.filter((order) => new Date(order.createdAt).getTime() <= endDate)
    }

    return orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error searching orders:', error)
    return []
  }
}

// Update order status
export function updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
  try {
    const orders = loadOrders()
    const index = orders.findIndex((order) => order.orderId === orderId)

    if (index === -1) {
      return null
    }

    orders[index].status = status
    orders[index].updatedAt = new Date().toISOString()

    if (saveOrders(orders)) {
      return orders[index]
    }
    return null
  } catch (error) {
    console.error('Error updating order status:', error)
    return null
  }
}

// Get order statistics
export function getOrderStats(): OrderStats {
  try {
    const orders = loadOrders()

    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)

    // Find most ordered product
    const productCounts: { [key: string]: number } = {}
    orders.forEach((order) => {
      order.items.forEach((item) => {
        productCounts[item.productName] = (productCounts[item.productName] || 0) + item.quantity
      })
    })

    const mostOrderedProduct = Object.entries(productCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'

    // Get 10 recent orders
    const recentOrders = orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 10)

    return {
      totalOrders,
      totalRevenue,
      mostOrderedProduct,
      recentOrders,
    }
  } catch (error) {
    console.error('Error getting order stats:', error)
    return {
      totalOrders: 0,
      totalRevenue: 0,
      mostOrderedProduct: 'N/A',
      recentOrders: [],
    }
  }
}

// Get orders by customer name
export function getOrdersByCustomer(customerName: string): Order[] {
  try {
    const orders = loadOrders()
    return orders
      .filter((order) => order.customerName.toLowerCase().includes(customerName.toLowerCase()))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error('Error getting customer orders:', error)
    return []
  }
}

// Get orders by WhatsApp number
export function getOrdersByWhatsApp(whatsappNumber: string): Order[] {
  try {
    const orders = loadOrders()
    return orders
      .filter((order) => order.whatsappNumber === whatsappNumber)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error('Error getting orders by WhatsApp:', error)
    return []
  }
}

// Delete order (soft delete)
export function deleteOrder(orderId: string): boolean {
  try {
    const order = getOrderById(orderId)
    if (order) {
      return updateOrderStatus(orderId, 'Cancelled') !== null
    }
    return false
  } catch (error) {
    console.error('Error deleting order:', error)
    return false
  }
}

// Generate receipt number
export function generateReceiptNumber(): string {
  const now = new Date()
  const year = now.getFullYear().toString().slice(-2)
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `MC${year}${month}${day}${random}`
}
