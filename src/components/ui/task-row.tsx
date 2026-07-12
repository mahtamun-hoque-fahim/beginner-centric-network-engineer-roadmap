'use client'

import { Check } from 'lucide-react'

type Resource = { label: string; url: string; type: 'free' | 'paid' }

export function TaskRow({
  title,
  scenario,
  resources,
  completed,
  onToggle,
}: {
  title: string
  scenario: string
  resources: Resource[] | null
  completed: boolean
  onToggle: () => void
}) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5 hover:border-accent-faint transition-colors">
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          aria-pressed={completed}
          aria-label={completed ? `Mark "${title}" incomplete` : `Mark "${title}" complete`}
          className={`mt-0.5 shrink-0 size-5 rounded-md border flex items-center justify-center transition-colors ${
            completed
              ? 'bg-accent border-accent text-bg'
              : 'border-border bg-surface-elevated hover:border-accent-faint'
          }`}
        >
          {completed && <Check className="size-3.5" strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold text-base ${completed ? 'text-text-muted line-through' : 'text-text'}`}
          >
            {title}
          </h3>
          <p className="text-text-muted text-sm mt-1">{scenario}</p>

          {resources && resources.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {resources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-sm border border-border bg-surface-elevated hover:border-accent-faint transition-colors"
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      r.type === 'free' ? 'bg-accent' : 'bg-warning'
                    }`}
                  />
                  {r.label}
                  <span className="text-text-faint uppercase tracking-wide">
                    {r.type}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
