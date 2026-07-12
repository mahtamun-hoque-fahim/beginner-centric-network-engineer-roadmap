import Link from 'next/link'
import { getUsersList } from '@/lib/admin'

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; university?: string }>
}) {
  const params = await searchParams
  const users = await getUsersList({
    country: params.country,
    university: params.university,
  })

  return (
    <div className="max-w-5xl">
      <p
        className="text-accent text-xs tracking-[0.2em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Admin
      </p>
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      <form className="flex flex-wrap gap-3 mb-6" method="get">
        <input
          type="text"
          name="country"
          placeholder="Filter by country"
          defaultValue={params.country}
          className="bg-surface border border-border rounded-md px-3 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none transition-colors"
        />
        <input
          type="text"
          name="university"
          placeholder="Filter by university"
          defaultValue={params.university}
          className="bg-surface border border-border rounded-md px-3 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="bg-surface text-text px-4 py-2 rounded-md border border-border hover:bg-surface-elevated transition-colors text-sm"
        >
          Filter
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-muted border-b border-border">
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Country</th>
              <th className="py-2 pr-4 font-medium">University</th>
              <th className="py-2 pr-4 font-medium">Progress</th>
              <th className="py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border">
                <td className="py-3 pr-4 min-w-0">
                  <span className="truncate block max-w-[180px]">{u.name}</span>
                </td>
                <td className="py-3 pr-4 text-text-muted">{u.country ?? '—'}</td>
                <td className="py-3 pr-4 text-text-muted min-w-0">
                  <span className="truncate block max-w-[200px]">{u.university ?? '—'}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-accent font-medium">{u.progressPct}%</span>
                </td>
                <td className="py-3">
                  <Link href={`/admin/users/${u.id}`} className="text-accent hover:text-accent-hover">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && <p className="text-text-muted text-sm mt-6">No users match this filter.</p>}
      </div>
    </div>
  )
}
