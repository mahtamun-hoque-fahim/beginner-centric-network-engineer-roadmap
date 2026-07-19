import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { additionalUserFields } from '@/lib/auth-fields'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [inferAdditionalFields({ user: additionalUserFields })],
})

export const { signIn, signUp, signOut, useSession } = authClient
