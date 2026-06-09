import { NextRequest, NextResponse } from 'next/server'
import { getOrdersByWhatsApp, getOrdersByCustomer } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const whatsapp = searchParams.get('whatsapp')
    const name = searchParams.get('name')

    if (whatsapp) {
      const orders = getOrdersByWhatsApp(whatsapp)
      return NextResponse.json(orders)
    }

    if (name) {
      const orders = getOrdersByCustomer(name)
      return NextResponse.json(orders)
    }

    return NextResponse.json(
      { error: 'Provide either whatsapp or name parameter' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error fetching customer orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
