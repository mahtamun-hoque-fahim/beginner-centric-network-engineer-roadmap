import { getAdminStats } from '@/lib/admin'

export default async function AdminOverviewPage() {
  const stats = await getAdminStats()

  return (
    <div className="max-w-4xl">
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Admin
      </p>
      <h1 className="text-3xl font-bold mb-8">What's happening.</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-text-muted text-sm mb-1">Total users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-text-muted text-sm mb-1">Roadmap completion rate</p>
          <p className="text-2xl font-bold text-accent">{stats.completionRate}%</p>
          <p className="text-text-faint text-xs mt-1">of users finished 100%</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-text-muted text-sm mb-1">Average progress</p>
          <p className="text-2xl font-bold">{stats.avgCompletionPct}%</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
      <div className="flex flex-col gap-2">
        {stats.recentActivity.length === 0 && (
          <p className="text-text-muted text-sm">No task completions yet.</p>
        )}
        {stats.recentActivity.map((row, i) => (
          <div
            key={`${row.userId}-${row.taskId}-${i}`}
            className="flex items-center justify-between bg-surface border border-border rounded-lg px-4 py-3 text-sm"
          >
            <span className="text-text-muted truncate min-w-0">
              User <span className="text-text" style={{ fontFamily: 'var(--font-mono)' }}>{row.userId.slice(0, 8)}</span>
              {' '}completed{' '}
              <span className="text-text">{row.taskId}</span>
            </span>
            <span className="text-text-faint text-xs shrink-0 ml-4">
              {row.completedAt.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
