'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/auth-client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await signIn.email({ email, password })

    setLoading(false)
    if (signInError) {
      setError(signInError.message ?? 'Could not sign in. Check your details and try again.')
      return
    }
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-text-muted text-sm mb-8">
          Sign in to pick up where you left off.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-text-muted mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text placeholder-text-faint focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-text-muted mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text placeholder-text-faint focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {error && <p className="text-danger text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-bg px-4 py-2 rounded-md font-semibold hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out disabled:opacity-60 disabled:active:scale-100"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-text-muted text-sm mt-6">
          New here?{' '}
          <Link href="/signup" className="text-accent hover:text-accent-hover">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}
