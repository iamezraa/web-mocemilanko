export type OrderStatus = 'Pending' | 'Sent to WhatsApp' | 'Confirmed' | 'Completed' | 'Cancelled'

export interface OrderItem {
  productId: string
  productName: string
  flavor: string
  quantity: number
  price: number
  totalPrice: number
}

export interface Order {
  id: string
  orderId: string
  receiptNumber: string
  customerName: string
  whatsappNumber: string
  address: string
  notes: string
  items: OrderItem[]
  totalPrice: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface OrderFormData {
  name: string
  whatsappNumber: string
  address: string
  notes: string
}

export interface OrderFilters {
  searchTerm?: string
  status?: OrderStatus
  startDate?: string
  endDate?: string
}

export interface OrderStats {
  totalOrders: number
  totalRevenue: number
  mostOrderedProduct: string
  recentOrders: Order[]
}
