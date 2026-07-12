import { requireUser } from '@/lib/auth/session'
import { DashboardNav } from '@/components/sections/dashboard-nav'
import { MobileDrawer } from '@/components/ui/mobile-drawer'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser() // redirects to /login if unauthenticated

  return (
    <div className="min-h-screen flex">
      <MobileDrawer label="Dashboard">
        <DashboardNav />
      </MobileDrawer>

      <aside className="w-64 shrink-0 border-r border-border bg-surface hidden md:block">
        <DashboardNav />
      </aside>
      <main className="flex-1 min-w-0 px-6 md:px-10 py-10 pt-20 md:pt-10">{children}</main>
    </div>
  )
}
