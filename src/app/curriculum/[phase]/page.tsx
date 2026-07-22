import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCurriculum } from '@/lib/curriculum'
import { PhaseAccordion } from '@/components/sections/phase-accordion'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>
}): Promise<Metadata> {
  const { phase: phaseId } = await params
  const phases = await getCurriculum()
  const phase = phases.find((p) => p.id === phaseId)

  if (!phase) return { title: 'Phase not found — Network Engineer Roadmap' }

  return {
    title: `${phase.title} — Network Engineer Roadmap`,
    description: phase.description ?? undefined,
  }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: phase.title,
            description: phase.description ?? undefined,
            step: phase.tasks.map((task) => ({
              '@type': 'HowToStep',
              name: task.title,
              text: task.scenario,
            })),
          }),
        }}
      />
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
