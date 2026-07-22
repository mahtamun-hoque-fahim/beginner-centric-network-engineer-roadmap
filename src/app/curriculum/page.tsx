import { getCurriculum } from '@/lib/curriculum'
import { PhaseAccordion } from '@/components/sections/phase-accordion'

// Fetch per-request, not at build time — keeps the build independent of
// DB availability, and means curriculum content updates show up without
// a redeploy.
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Free Network Engineering Curriculum for Beginners',
  description:
    'A 4-phase, task-by-task networking curriculum — subnetting, CCNA, Packet Tracer labs, and interview prep. Free to follow, no signup required.',
}

export default async function CurriculumPage() {
  const phases = await getCurriculum()

  return (
    <main className="min-h-screen px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Network Engineer Roadmap',
            description:
              'A beginner-centric, scenario-based network engineering curriculum for CSE students.',
            provider: {
              '@type': 'Organization',
              name: 'Network Engineer Roadmap',
            },
          }),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <p
          className="text-accent text-xs tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Full curriculum
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Follow it one task at a time.
        </h1>
        <p className="text-text-muted text-lg mb-10">
          Every task is a real job scenario, not a lecture. Check things off as
          you go — progress saves in this browser. Sign up any time to keep it
          across devices.
        </p>

        <PhaseAccordion phases={phases} />
      </div>
    </main>
  )
}
