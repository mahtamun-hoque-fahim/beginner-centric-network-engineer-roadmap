import { getDb } from '@/lib/db'
import { userProgress } from '@/lib/db/schema'
import { requireUser } from '@/lib/auth/session'
import { and, eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { getRandomQuote } from '@/lib/quotes'

export async function GET() {
  const session = await requireUser()
  const db = getDb()

  const rows = await db
    .select({ taskId: userProgress.taskId })
    .from(userProgress)
    .where(eq(userProgress.userId, session.user.id))

  return Response.json({ taskIds: rows.map((r) => r.taskId) })
}

export async function POST(request: Request) {
  const session = await requireUser()
  const db = getDb()
  const { taskId } = await request.json()

  if (!taskId || typeof taskId !== 'string') {
    return Response.json({ error: 'taskId is required' }, { status: 400 })
  }

  const existing = await db
    .select()
    .from(userProgress)
    .where(and(eq(userProgress.userId, session.user.id), eq(userProgress.taskId, taskId)))
    .limit(1)

  if (existing.length > 0) {
    await db
      .delete(userProgress)
      .where(and(eq(userProgress.userId, session.user.id), eq(userProgress.taskId, taskId)))
    return Response.json({ completed: false })
  }

  await db.insert(userProgress).values({
    id: randomUUID(),
    userId: session.user.id,
    taskId,
  })

  return Response.json({ completed: true, quote: getRandomQuote() })
}

// Merge-on-login: bulk-adopt task IDs completed anonymously (localStorage)
// into the signed-in user's server-side progress. Idempotent — safe to
// call every login even if there's nothing new to merge.
export async function PUT(request: Request) {
  const session = await requireUser()
  const db = getDb()
  const { taskIds } = await request.json()

  if (!Array.isArray(taskIds)) {
    return Response.json({ error: 'taskIds must be an array' }, { status: 400 })
  }

  const existing = await db
    .select({ taskId: userProgress.taskId })
    .from(userProgress)
    .where(eq(userProgress.userId, session.user.id))

  const existingIds = new Set(existing.map((r) => r.taskId))
  const toInsert = taskIds.filter(
    (id): id is string => typeof id === 'string' && !existingIds.has(id)
  )

  if (toInsert.length > 0) {
    await db.insert(userProgress).values(
      toInsert.map((taskId) => ({
        id: randomUUID(),
        userId: session.user.id,
        taskId,
      }))
    )
  }

  return Response.json({ merged: toInsert.length })
}
