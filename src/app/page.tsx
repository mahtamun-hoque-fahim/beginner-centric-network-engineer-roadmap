import Link from 'next/link'
import { HeroBackground } from '@/components/ui/hero-background'

export const metadata = {
  title: 'Network Engineer Roadmap for CSE Students | Free & Interview-Ready',
  description:
    'A free, scenario-based roadmap that takes CSE students from zero networking knowledge to interview-ready — no lectures, no gatekeeping.',
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 max-w-2xl text-center">
        <p
          className="text-accent text-xs tracking-[0.2em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Network Engineer Roadmap
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Beginner to
          <br />
          interview-ready.
        </h1>
        <p className="text-text-muted text-lg mb-10">
          A scenario-based path built for CSE students who want to be
          competitive with dedicated networking graduates — no lectures, no
          gatekeeping, just the next real task.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/curriculum"
            className="bg-accent text-bg px-6 py-3 rounded-md font-semibold hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out"
          >
            Start the roadmap
          </Link>
          <Link
            href="/signup"
            className="bg-surface text-text px-6 py-3 rounded-md border border-border hover:bg-surface-elevated active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  )
}
