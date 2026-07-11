export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p
          className="text-accent text-xs tracking-[0.2em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Network Engineer Roadmap
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Beginner to interview-ready.
        </h1>
        <p className="text-text-muted text-lg">
          Phase 1 scaffold live. Curriculum, dashboards, and tracks are next.
        </p>
      </div>
    </main>
  )
}
