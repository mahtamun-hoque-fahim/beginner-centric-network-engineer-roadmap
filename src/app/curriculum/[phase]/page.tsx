import { notFound } from 'next/navigation'
import { getCurriculum } from '@/lib/curriculum'
import { PhaseAccordion } from '@/components/sections/phase-accordion'

export async function generateStaticParams() {
  const phases = await getCurriculum()
  return phases.map((p) => ({ phase: p.id }))
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ phase: string }>
}) {
  const { phase: phaseId } = await params
  const phases = await getCurriculum()
  const phase = phases.find((p) => p.id === phaseId)

  if (!phase) notFound()

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p
          className="text-accent text-xs tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Single phase
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-10">{phase.title}</h1>
        <PhaseAccordion phases={[phase]} />
      </div>
    </main>
  )
}
