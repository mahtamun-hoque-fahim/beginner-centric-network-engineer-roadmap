import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        {/* IMAGE-BRIEF: err-404 | 16:9 | small friendly illustration, dark surface bg-surface, single accent-colored line-art element (e.g. a disconnected cable or dead-end path node), no baked-in text, matches the topographic-line motif from the hero */}
        <div
          data-image-slot="err-404"
          className="aspect-video w-full rounded-xl border border-dashed border-border bg-surface/40 mb-8 bg-[linear-gradient(110deg,var(--color-surface)_8%,var(--color-surface-elevated)_18%,var(--color-surface)_33%)] bg-[length:200%_100%] animate-[shimmer_2.2s_var(--ease-in-out)_infinite]"
        />

        <p
          className="text-accent text-xs tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          404
        </p>
        <h1 className="text-2xl font-bold mb-3">This path doesn't connect.</h1>
        <p className="text-text-muted text-sm mb-8">
          The page you're looking for doesn't exist — but the roadmap does.
        </p>

        <Link
          href="/"
          className="inline-flex bg-accent text-bg px-5 py-2.5 rounded-md font-semibold hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out"
        >
          Back to start
        </Link>
      </div>
    </main>
  )
}
