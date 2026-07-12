import { getDb } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { requireUser } from '@/lib/auth/session'
import { eq } from 'drizzle-orm'

export async function PUT(request: Request) {
  const session = await requireUser()
  const db = getDb()
  const body = await request.json()

  const { country, educationStatus, university, department, cgpa } = body

  await db
    .update(users)
    .set({ country, educationStatus, university, department, cgpa })
    .where(eq(users.id, session.user.id))

  return Response.json({ ok: true })
}
