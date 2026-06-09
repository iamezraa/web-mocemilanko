import { NextRequest, NextResponse } from 'next/server'
import { Order } from '@/types/order'
import {
  addOrder,
  generateReceiptNumber,
  getAllOrders,
  searchOrders,
} from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerName, whatsappNumber, address, notes, totalPrice } = body

    if (!customerName || !whatsappNumber || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const orderId = `MC-${Date.now().toString().slice(-6)}`
    const receiptNumber = generateReceiptNumber()
    const now = new Date().toISOString()

    const order: Order = {
      id: Math.random().toString(36).substring(2, 11),
      orderId,
      receiptNumber,
      customerName,
      whatsappNumber,
      address,
      notes: notes || '',
      items,
      totalPrice,
      status: 'Pending',
      createdAt: now,
      updatedAt: now,
    }

    const savedOrder = addOrder(order)
    if (!savedOrder) {
      return NextResponse.json(
        { error: 'Failed to save order' },
        { status: 500 }
      )
    }

    return NextResponse.json(savedOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') as any
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''

    if (search || status || startDate || endDate) {
      const results = searchOrders({
        searchTerm: search,
        status,
        startDate,
        endDate,
      })
      return NextResponse.json(results)
    }

    const orders = getAllOrders()
    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
