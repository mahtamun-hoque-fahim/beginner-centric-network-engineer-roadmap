'use client'

import { useEffect, useState } from 'react'

export function QuoteToast({ quote, onDone }: { quote: string | null; onDone: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!quote) return
    setVisible(true)
    const showFor = setTimeout(() => setVisible(false), 2600)
    const cleanup = setTimeout(onDone, 3000)
    return () => {
      clearTimeout(showFor)
      clearTimeout(cleanup)
    }
  }, [quote, onDone])

  if (!quote) return null

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-3rem)] transition-all duration-200 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-surface-elevated border border-accent-faint rounded-xl px-6 py-4 shadow-[0_0_24px_var(--color-accent-faint)]">
        <p className="text-text text-base font-medium text-center">{quote}</p>
      </div>
    </div>
  )
}
