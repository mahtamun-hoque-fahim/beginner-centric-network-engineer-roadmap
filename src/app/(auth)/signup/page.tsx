'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/auth-client'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    educationStatus: '',
    university: '',
    department: '',
    cgpa: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signUpError } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      country: form.country,
      educationStatus: form.educationStatus,
      university: form.university,
      department: form.department,
      cgpa: form.cgpa,
    })

    setLoading(false)
    if (signUpError) {
      setError(signUpError.message ?? 'Could not create your account. Try again.')
      return
    }
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-1">Track your progress</h1>
        <p className="text-text-muted text-sm mb-8">
          Free forever. Only needed to save progress across devices.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm text-text-muted mb-1.5">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={update('name')}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-text-muted mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
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
              minLength={8}
              value={form.password}
              onChange={update('password')}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm text-text-muted mb-1.5">
                Country
              </label>
              <input
                id="country"
                value={form.country}
                onChange={update('country')}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="educationStatus" className="block text-sm text-text-muted mb-1.5">
                Education status
              </label>
              <select
                id="educationStatus"
                value={form.educationStatus}
                onChange={update('educationStatus')}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
              >
                <option value="">Select</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="self-taught">Self-taught</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="university" className="block text-sm text-text-muted mb-1.5">
              University
            </label>
            <input
              id="university"
              value={form.university}
              onChange={update('university')}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="department" className="block text-sm text-text-muted mb-1.5">
                Department
              </label>
              <input
                id="department"
                value={form.department}
                onChange={update('department')}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="cgpa" className="block text-sm text-text-muted mb-1.5">
                CGPA (optional)
              </label>
              <input
                id="cgpa"
                value={form.cgpa}
                onChange={update('cgpa')}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>

          {error && <p className="text-danger text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-bg px-4 py-2 rounded-md font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-text-muted text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:text-accent-hover">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
