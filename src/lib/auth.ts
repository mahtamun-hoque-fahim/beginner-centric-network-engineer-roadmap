import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getDb } from '@/lib/db'

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), { provider: 'pg' }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh daily
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false, // never settable by the client — prevents self-promotion to admin
      },
      country: { type: 'string', required: false },
      educationStatus: { type: 'string', required: false },
      university: { type: 'string', required: false },
      department: { type: 'string', required: false },
      cgpa: { type: 'string', required: false },
      tier: { type: 'string', required: false, defaultValue: 'free' },
    },
  },
})
