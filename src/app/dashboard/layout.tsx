import { requireUser } from '@/lib/auth/session'
import { DashboardNav } from '@/components/sections/dashboard-nav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser() // redirects to /login if unauthenticated

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 border-r border-border bg-surface hidden md:block">
        <DashboardNav />
      </aside>
      <main className="flex-1 min-w-0 px-6 md:px-10 py-10">{children}</main>
    </div>
  )
}
