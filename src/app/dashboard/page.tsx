import Link from 'next/link'
import { Flame, ArrowRight } from 'lucide-react'
import { requireUser } from '@/lib/auth/session'
import { getUserDashboardStats } from '@/lib/dashboard'

export default async function DashboardPage() {
  const session = await requireUser()
  const stats = await getUserDashboardStats(session.user.id)

  return (
    <div className="max-w-3xl">
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Overview
      </p>
      <h1 className="text-3xl font-bold mb-8">
        Welcome back, {session.user.name?.split(' ')[0] ?? 'there'}.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-text-muted text-sm mb-1">Progress</p>
          <p className="text-2xl font-bold text-accent">{stats.progressPct}%</p>
          <p className="text-text-faint text-xs mt-1">
            {stats.completedCount} of {stats.totalTasks} tasks
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-text-muted text-sm mb-1 flex items-center gap-1.5">
            <Flame className="size-4 text-warning" />
            Streak
          </p>
          <p className="text-2xl font-bold">{stats.streak}</p>
          <p className="text-text-faint text-xs mt-1">
            {stats.streak === 1 ? 'day' : 'days'} in a row
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-text-muted text-sm mb-1">Current phase</p>
          <p className="text-base font-semibold leading-snug">
            {stats.currentPhase?.title ?? 'Not started'}
          </p>
        </div>
      </div>

      <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden mb-8">
        <div
          className="bg-accent h-full transition-all duration-300"
          style={{ width: `${stats.progressPct}%` }}
        />
      </div>

      <Link
        href="/dashboard/roadmap"
        className="inline-flex items-center gap-2 bg-accent text-bg px-5 py-2.5 rounded-md font-semibold hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out"
      >
        Continue the roadmap
        <ArrowRight className="size-4" />
      </Link>

      {stats.roadmapComplete && (
        <div className="mt-10 bg-surface-elevated border border-accent-faint rounded-xl p-6">
          <p className="text-accent font-semibold mb-1">Roadmap complete.</p>
          <p className="text-text-muted text-sm mb-4">
            Your CV and interview-prep tracks are fully unlocked now.
          </p>
          <div className="flex gap-3">
            <Link
              href="/dashboard/cv"
              className="bg-accent text-bg px-4 py-2 rounded-md font-semibold hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out text-sm"
            >
              Open CV track
            </Link>
            <Link
              href="/dashboard/interview-prep"
              className="bg-surface text-text px-4 py-2 rounded-md border border-border hover:bg-surface-elevated active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out text-sm"
            >
              Open interview prep
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
