'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function MobileDrawer({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open ${label} menu`}
        className="fixed top-4 left-4 z-40 flex items-center justify-center size-10 rounded-md bg-surface border border-border text-text"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm animate-[fade-in_200ms_var(--ease-subtle)]"
          />

          {/* Drawer panel */}
          <div className="absolute inset-y-0 left-0 w-72 bg-surface border-r border-border flex flex-col animate-[drawer-in_300ms_var(--ease-drawer)]">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span
                className="text-text-muted text-xs uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {label}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center size-8 rounded-md hover:bg-surface-elevated transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" onClick={() => setOpen(false)}>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
