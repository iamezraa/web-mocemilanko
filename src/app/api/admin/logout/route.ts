import { NextRequest, NextResponse } from 'next/server'
import { destroySession } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('admin_session')?.value

    if (sessionId) {
      destroySession(sessionId)
    }

    const response = NextResponse.json({
      message: 'Logout successful',
    })

    // Clear session cookie
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
