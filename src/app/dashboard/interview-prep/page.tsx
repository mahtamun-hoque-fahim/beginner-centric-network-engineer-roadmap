import { requireUser } from '@/lib/auth/session'
import { getUserDashboardStats } from '@/lib/dashboard'
import { TeaserGate } from '@/components/ui/teaser-gate'
import { InterviewPrepTool } from '@/components/sections/interview-prep-tool'

export default async function InterviewPrepPage() {
  const session = await requireUser()
  const stats = await getUserDashboardStats(session.user.id)

  return (
    <div className="max-w-2xl">
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Interview prep
      </p>
      <h1 className="text-3xl font-bold mb-8">Talk through it before they ask.</h1>

      {stats.roadmapComplete ? (
        <InterviewPrepTool />
      ) : (
        <TeaserGate
          title="Practice questions grouped by topic"
          progressPct={stats.progressPct}
          preview={[
            'Fundamentals, subnetting, routing/switching, and troubleshooting scenarios',
            'Real interview-style questions, not textbook definitions',
            'Self-check practice — talk it through, then mark it done',
            'Grows alongside the roadmap content as you finish more phases',
          ]}
        />
      )}
    </div>
  )
}
