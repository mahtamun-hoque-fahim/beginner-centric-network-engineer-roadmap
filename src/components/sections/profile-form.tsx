'use client'

import { useState } from 'react'

type Profile = {
  country: string
  educationStatus: string
  university: string
  department: string
  cgpa: string
}

export function ProfileForm({ initial }: { initial: Profile }) {
  const [form, setForm] = useState<Profile>(initial)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  function update(field: keyof Profile) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSavedAt(Date.now())
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm text-text-muted mb-1.5">Country</label>
        <input
          value={form.country}
          onChange={update('country')}
          className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-text-muted mb-1.5">Education status</label>
        <select
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

      <div>
        <label className="block text-sm text-text-muted mb-1.5">University</label>
        <input
          value={form.university}
          onChange={update('university')}
          className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-muted mb-1.5">Department</label>
          <input
            value={form.department}
            onChange={update('department')}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1.5">CGPA</label>
          <input
            value={form.cgpa}
            onChange={update('cgpa')}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent text-bg px-4 py-2 rounded-md font-semibold hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out disabled:opacity-60 disabled:active:scale-100"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
        {savedAt && <span className="text-text-faint text-xs">Saved.</span>}
      </div>
    </form>
  )
}
