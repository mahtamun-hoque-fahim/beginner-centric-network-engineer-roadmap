'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth-client'

const links = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="flex flex-col gap-1 p-4 h-full">
      <div className="flex-1 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                active
                  ? 'bg-accent-faint text-accent'
                  : 'text-text-muted hover:text-text hover:bg-surface-elevated'
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </div>

      <button
        onClick={async () => {
          await signOut()
          router.push('/')
        }}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-muted hover:text-text hover:bg-surface-elevated transition-colors"
      >
        <LogOut className="size-4 shrink-0" />
        Sign out
      </button>
    </nav>
  )
}
