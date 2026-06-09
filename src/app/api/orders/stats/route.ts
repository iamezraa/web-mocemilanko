import { NextResponse } from 'next/server'
import { getOrderStats } from '@/lib/database'

export async function GET() {
  try {
    const stats = getOrderStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
