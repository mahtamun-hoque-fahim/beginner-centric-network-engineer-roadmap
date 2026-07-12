import { notFound } from 'next/navigation'
import { getUserDetail } from '@/lib/admin'

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const detail = await getUserDetail(id)

  if (!detail) notFound()

  const { user, completedCount, totalTasks, progressPct, recentCompletions } = detail

  return (
    <div className="max-w-3xl">
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Admin
      </p>
      <h1 className="text-3xl font-bold mb-8">{user.name ?? user.email}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-text-muted text-xs mb-1">Country</p>
          <p className="text-sm font-medium">{user.country ?? '—'}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-text-muted text-xs mb-1">University</p>
          <p className="text-sm font-medium">{user.university ?? '—'}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-text-muted text-xs mb-1">Department</p>
          <p className="text-sm font-medium">{user.department ?? '—'}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-text-muted text-xs mb-1">CGPA</p>
          <p className="text-sm font-medium">{user.cgpa ?? '—'}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-text-muted mb-2">
          <span>{completedCount} of {totalTasks} tasks complete</span>
          <span>{progressPct}%</span>
        </div>
        <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
          <div className="bg-accent h-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent completions</h2>
      <div className="flex flex-col gap-2">
        {recentCompletions.length === 0 && (
          <p className="text-text-muted text-sm">No task completions yet.</p>
        )}
        {recentCompletions.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between bg-surface border border-border rounded-lg px-4 py-3 text-sm"
          >
            <span className="text-text">{row.taskId}</span>
            <span className="text-text-faint text-xs">{row.completedAt.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
