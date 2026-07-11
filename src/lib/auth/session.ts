import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export const getSession = cache(async () => {
  const h = await headers()
  return auth.api.getSession({ headers: h })
})

export const requireUser = cache(async () => {
  const session = await getSession()
  if (!session?.user) redirect('/login')
  return session
})

export const requireAdmin = cache(async () => {
  const session = await getSession()
  if (!session?.user || session.user.role !== 'admin') redirect('/login')
  return session
})
