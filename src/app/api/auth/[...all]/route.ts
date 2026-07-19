import { getAuth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'
import { authRateLimit } from '@/lib/rate-limit'

// Do not hoist `toNextJsHandler(getAuth().handler)` to module scope — this
// route file gets imported during Next.js's build-time route collection,
// which would eagerly construct the Better Auth instance (and its DB
// connection) before env vars are guaranteed to be present. Compute lazily
// inside each request handler instead.

export async function GET(request: Request) {
  const handler = toNextJsHandler(getAuth().handler)
  return handler.GET(request)
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await authRateLimit.limit(ip)

  if (!success) {
    return Response.json(
      { error: 'Too many attempts. Try again in a minute.' },
      { status: 429 }
    )
  }

  const handler = toNextJsHandler(getAuth().handler)
  return handler.POST(request)
}
