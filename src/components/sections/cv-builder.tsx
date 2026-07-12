'use client'

import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

type CvData = {
  summary: string
  skills: string
  projects: string
  certifications: string
}

const empty: CvData = { summary: '', skills: '', projects: '', certifications: '' }

export function CvBuilder() {
  const [data, setData] = useState<CvData>(empty)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/tracks/cv')
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setData({ ...empty, ...res.data })
        setLoading(false)
      })
  }, [])

  async function save() {
    setSaving(true)
    await fetch('/api/tracks/cv', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })
    setSaving(false)
    setSavedAt(Date.now())
  }

  function update(field: keyof CvData) {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  if (loading) return <p className="text-text-muted text-sm">Loading your draft...</p>

  const fields: { key: keyof CvData; label: string; hint: string }[] = [
    {
      key: 'summary',
      label: 'Professional summary',
      hint: '2-3 sentences on who you are and what you can do, in networking terms.',
    },
    {
      key: 'skills',
      label: 'Skills',
      hint: 'Subnetting, VLANs, OSPF, ACLs, NAT, Wireshark, Python/netmiko — list what you actually did in the roadmap.',
    },
    {
      key: 'projects',
      label: 'Labs and projects',
      hint: 'Every Packet Tracer lab you built and broke counts. Describe 2-3 concretely.',
    },
    {
      key: 'certifications',
      label: 'Certifications and courses',
      hint: 'CCNA, Network+, Core 5G and Beyond MOOC — whatever you actually completed.',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {fields.map(({ key, label, hint }) => (
        <div key={key}>
          <label className="block text-sm font-medium mb-1">{label}</label>
          <p className="text-text-faint text-xs mb-2">{hint}</p>
          <textarea
            value={data[key]}
            onChange={update(key)}
            rows={4}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text placeholder-text-faint focus:border-accent focus:outline-none transition-colors resize-y"
          />
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-accent text-bg px-4 py-2 rounded-md font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60"
        >
          <Save className="size-4" />
          {saving ? 'Saving...' : 'Save draft'}
        </button>
        {savedAt && <span className="text-text-faint text-xs">Saved.</span>}
      </div>
    </div>
  )
}
