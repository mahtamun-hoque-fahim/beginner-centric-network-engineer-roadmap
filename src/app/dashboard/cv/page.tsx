import { requireUser } from '@/lib/auth/session'
import { getUserDashboardStats } from '@/lib/dashboard'
import { TeaserGate } from '@/components/ui/teaser-gate'
import { CvBuilder } from '@/components/sections/cv-builder'

export default async function CvTrackPage() {
  const session = await requireUser()
  const stats = await getUserDashboardStats(session.user.id)

  return (
    <div className="max-w-2xl">
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        CV track
      </p>
      <h1 className="text-3xl font-bold mb-8">Turn what you built into a CV.</h1>

      {stats.roadmapComplete ? (
        <CvBuilder />
      ) : (
        <TeaserGate
          title="Your CV, built from what you actually did"
          progressPct={stats.progressPct}
          preview={[
            'Professional summary written in networking terms, not generic filler',
            'Skills section pulled straight from the labs you completed',
            'Project descriptions for every Packet Tracer build you finished',
            'A certifications section that only lists what is real',
          ]}
        />
      )}
    </div>
  )
}
