import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('admin_session')?.value

    if (!sessionId) {
      return NextResponse.json(
        { error: 'No session' },
        { status: 401 }
      )
    }

    const admin = verifySession(sessionId)
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      admin,
      authenticated: true,
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}
