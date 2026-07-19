import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getDb } from '@/lib/db'
import { additionalUserFields } from '@/lib/auth-fields'

// Lazy singleton — mirrors the getDb() pattern in src/lib/db/index.ts.
// betterAuth() must NOT be constructed at module scope: doing so calls
// getDb() -> neon(process.env.DATABASE_URL!) immediately when this file is
// first imported, which can happen during Next.js's build-time route
// collection, before any request (and before env vars are guaranteed to be
// present). This crashed every Vercel deploy with "No database connection
// string was provided to neon()" even when the actual runtime env vars were
// fine. Never revert this to `export const auth = betterAuth(...)`.
let _auth: ReturnType<typeof createAuth> | null = null

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: 'pg' }),
    emailAndPassword: {
      enabled: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // refresh daily
    },
    user: {
      additionalFields: additionalUserFields,
    },
  })
}

export function getAuth() {
  if (!_auth) {
    _auth = createAuth()
  }
  return _auth!
}
