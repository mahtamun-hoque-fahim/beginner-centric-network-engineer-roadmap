import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'
import { authRateLimit } from '@/lib/rate-limit'

const handler = toNextJsHandler(auth.handler)

export const { GET } = handler

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await authRateLimit.limit(ip)

  if (!success) {
    return Response.json(
      { error: 'Too many attempts. Try again in a minute.' },
      { status: 429 }
    )
  }

  return handler.POST(request)
}
