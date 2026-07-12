'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

const categories = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    questions: [
      'Walk me through what happens when you type a URL into a browser and hit enter.',
      'What is the difference between a switch and a router?',
      'Explain the difference between TCP and UDP, and give a real example of each.',
    ],
  },
  {
    id: 'subnetting',
    title: 'Subnetting and addressing',
    questions: [
      'How would you subnet a /24 network into 4 equal parts?',
      'What is the difference between a public and a private IP address?',
      'Explain what NAT does and why most home networks need it.',
    ],
  },
  {
    id: 'routing-switching',
    title: 'Routing and switching',
    questions: [
      'What is the difference between static and dynamic routing? When would you use each?',
      'Explain how OSPF chooses the best path.',
      'What is a VLAN, and why would a company use one?',
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting scenarios',
    questions: [
      'A user says the internet is down. Walk me through your troubleshooting steps.',
      'Ping works but the browser will not load a page. What do you check first?',
      'You capture a packet trace and see repeated TCP retransmissions. What does that tell you?',
    ],
  },
]

export function InterviewPrepTool() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [openCategory, setOpenCategory] = useState<string | null>(categories[0].id)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tracks/interview-prep')
      .then((r) => r.json())
      .then((res) => {
        if (res.data?.checked) setChecked(res.data.checked)
        setLoading(false)
      })
  }, [])

  function toggle(question: string) {
    const next = { ...checked, [question]: !checked[question] }
    setChecked(next)
    fetch('/api/tracks/interview-prep', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { checked: next } }),
    })
  }

  if (loading) return <p className="text-text-muted text-sm">Loading...</p>

  const total = categories.reduce((sum, c) => sum + c.questions.length, 0)
  const done = Object.values(checked).filter(Boolean).length

  return (
    <div>
      <p className="text-text-muted text-sm mb-6">
        {done} of {total} practiced. Talk through each one out loud before checking it off.
      </p>

      <div className="flex flex-col gap-3">
        {categories.map((cat) => {
          const isOpen = openCategory === cat.id
          return (
            <div key={cat.id} className="bg-surface-elevated border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <h3 className="font-semibold">{cat.title}</h3>
                <ChevronDown
                  className={`size-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 flex flex-col gap-2">
                  {cat.questions.map((q) => (
                    <button
                      key={q}
                      onClick={() => toggle(q)}
                      className="flex items-start gap-3 text-left p-3 rounded-lg bg-surface border border-border hover:border-accent-faint transition-colors"
                    >
                      <span
                        className={`mt-0.5 shrink-0 size-5 rounded-md border flex items-center justify-center transition-colors ${
                          checked[q]
                            ? 'bg-accent border-accent text-bg'
                            : 'border-border bg-surface-elevated'
                        }`}
                      >
                        {checked[q] && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                      <span className={`text-sm ${checked[q] ? 'text-text-muted line-through' : 'text-text'}`}>
                        {q}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
