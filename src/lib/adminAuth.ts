import crypto from 'crypto'

// Admin credentials (in production, move to database or environment variables)
const ADMIN_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@mocemilanko.com',
    password: hashPassword('mocemilanko123'), // Change in production
    role: 'super_admin',
  },
  {
    id: '2',
    username: 'staff',
    email: 'staff@mocemilanko.com',
    password: hashPassword('staff123'), // Change in production
    role: 'staff',
  },
]

// Simple password hashing (in production, use bcryptjs)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Find admin by username or email
export function findAdmin(username: string, password: string) {
  const admin = ADMIN_USERS.find(
    (user) => (user.username === username || user.email === username) && verifyPassword(password, user.password)
  )
  if (admin) {
    const { password, ...adminWithoutPassword } = admin
    return adminWithoutPassword
  }
  return null
}

// Get admin by ID
export function getAdminById(id: string) {
  const admin = ADMIN_USERS.find((user) => user.id === id)
  if (admin) {
    const { password, ...adminWithoutPassword } = admin
    return adminWithoutPassword
  }
  return null
}

// Session storage (in production, use database or Redis)
const sessions = new Map<string, { adminId: string; createdAt: number }>()

// Session timeout: 24 hours
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000

// Create session
export function createSession(adminId: string): string {
  const sessionId = crypto.randomBytes(32).toString('hex')
  sessions.set(sessionId, {
    adminId,
    createdAt: Date.now(),
  })
  return sessionId
}

// Get session
export function getSession(sessionId: string) {
  const session = sessions.get(sessionId)
  if (!session) return null

  // Check if session expired
  if (Date.now() - session.createdAt > SESSION_TIMEOUT) {
    sessions.delete(sessionId)
    return null
  }

  return session
}

// Verify session
export function verifySession(sessionId: string) {
  const session = getSession(sessionId)
  if (!session) return null
  return getAdminById(session.adminId)
}

// Destroy session
export function destroySession(sessionId: string): boolean {
  return sessions.delete(sessionId)
}

// List all sessions (for debugging)
export function getAllSessions() {
  return Array.from(sessions.entries())
}

// Clear expired sessions
export function clearExpiredSessions() {
  const now = Date.now()
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_TIMEOUT) {
      sessions.delete(sessionId)
    }
  }
}
