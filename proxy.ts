import { NextRequest, NextResponse } from 'next/server'

// Thin network layer only — real session validation happens in the DAL
// (src/lib/auth/session.ts: requireUser, requireAdmin), never here.
// This just catches the obvious unauthenticated case fast.
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has('better-auth.session_token')
  const isProtected =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/admin')

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
