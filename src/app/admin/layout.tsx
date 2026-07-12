import { requireAdmin } from '@/lib/auth/session'
import { AdminNav } from '@/components/sections/admin-nav'
import { MobileDrawer } from '@/components/ui/mobile-drawer'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin() // redirects to /login if not an admin

  return (
    <div className="min-h-screen flex">
      <MobileDrawer label="Admin">
        <AdminNav />
      </MobileDrawer>

      <aside className="w-64 shrink-0 border-r border-border bg-surface hidden md:block">
        <AdminNav />
      </aside>
      <main className="flex-1 min-w-0 px-6 md:px-10 py-10 pt-20 md:pt-10">{children}</main>
    </div>
  )
}
