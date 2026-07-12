import { getDb } from '@/lib/db'
import { interviewPrepTrack } from '@/lib/db/schema'
import { requireUser } from '@/lib/auth/session'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export async function GET() {
  const session = await requireUser()
  const db = getDb()

  const rows = await db
    .select()
    .from(interviewPrepTrack)
    .where(eq(interviewPrepTrack.userId, session.user.id))
    .limit(1)
  return Response.json({ data: rows[0]?.data ?? null })
}

export async function PUT(request: Request) {
  const session = await requireUser()
  const db = getDb()
  const { data } = await request.json()

  const existing = await db
    .select()
    .from(interviewPrepTrack)
    .where(eq(interviewPrepTrack.userId, session.user.id))
    .limit(1)

  if (existing.length > 0) {
    await db
      .update(interviewPrepTrack)
      .set({ data })
      .where(eq(interviewPrepTrack.userId, session.user.id))
  } else {
    await db.insert(interviewPrepTrack).values({
      id: randomUUID(),
      userId: session.user.id,
      status: 'teaser',
      data,
    })
  }

  return Response.json({ ok: true })
}
