import { Lock } from 'lucide-react'

export function TeaserGate({
  title,
  preview,
  progressPct,
}: {
  title: string
  preview: string[]
  progressPct: number
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-8">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="size-4 text-text-muted" />
        <span
          className="text-text-muted text-xs uppercase tracking-wide"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Unlocks at 100% roadmap completion — currently {progressPct}%
        </span>
      </div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="flex flex-col gap-2 mb-2">
        {preview.map((item) => (
          <li key={item} className="flex items-start gap-2 text-text-muted text-sm">
            <span className="size-1.5 rounded-full bg-accent-faint mt-2 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <p className="text-text-faint text-xs mt-6">
        Finish the roadmap to unlock the full tool.
      </p>
    </div>
  )
}
