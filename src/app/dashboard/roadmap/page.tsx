import { getCurriculum } from '@/lib/curriculum'
import { DashboardPhaseAccordion } from '@/components/sections/dashboard-phase-accordion'

export default async function DashboardRoadmapPage() {
  const phases = await getCurriculum()

  return (
    <div className="max-w-3xl">
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Your roadmap
      </p>
      <h1 className="text-3xl font-bold mb-8">Keep going, one task at a time.</h1>
      <DashboardPhaseAccordion phases={phases} />
    </div>
  )
}
