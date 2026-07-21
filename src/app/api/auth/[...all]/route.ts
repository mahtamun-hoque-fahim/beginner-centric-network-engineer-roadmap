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
  // x-vercel-forwarded-for is set by Vercel's edge network to the real
  // client IP and cannot be overridden by the client, unlike the plain
  // x-forwarded-for header (which a client can prepend arbitrary values to
  // before the request reaches Vercel, defeating rate limiting by rotating
  // the header on every request). Fall back to x-forwarded-for only for
  // local dev, where neither header reflects a real spoofing risk.
  const ip =
    request.headers.get('x-vercel-forwarded-for') ??
    request.headers.get('x-forwarded-for') ??
    'anonymous'
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
