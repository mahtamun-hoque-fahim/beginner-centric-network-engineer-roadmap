import { getDb } from '@/lib/db'
import { users, userProgress, roadmapTasks } from '@/lib/db/schema'
import { and, eq, ilike, sql } from 'drizzle-orm'

export async function getAdminStats() {
  const db = getDb()

  const [{ count: totalUsers }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users)

  const [{ count: totalTasks }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(roadmapTasks)

  const completionsPerUser = await db
    .select({
      userId: userProgress.userId,
      completed: sql<number>`count(*)::int`,
    })
    .from(userProgress)
    .groupBy(userProgress.userId)

  const usersWithFullCompletion = completionsPerUser.filter(
    (row) => totalTasks > 0 && row.completed >= totalTasks
  ).length

  const avgCompletionPct =
    totalUsers > 0 && totalTasks > 0
      ? Math.round(
          (completionsPerUser.reduce((sum, r) => sum + r.completed, 0) /
            (totalUsers * totalTasks)) *
            100
        )
      : 0

  const recentActivity = await db
    .select({
      userId: userProgress.userId,
      taskId: userProgress.taskId,
      completedAt: userProgress.completedAt,
    })
    .from(userProgress)
    .orderBy(sql`${userProgress.completedAt} desc`)
    .limit(10)

  return {
    totalUsers,
    totalTasks,
    completionRate: totalUsers > 0 ? Math.round((usersWithFullCompletion / totalUsers) * 100) : 0,
    avgCompletionPct,
    recentActivity,
  }
}

export async function getUsersList(filters: {
  country?: string
  university?: string
}) {
  const db = getDb()

  const conditions = []
  if (filters.country) conditions.push(ilike(users.country, `%${filters.country}%`))
  if (filters.university) conditions.push(ilike(users.university, `%${filters.university}%`))

  const rows = await db
    .select()
    .from(users)
    .where(conditions.length > 0 ? and(...conditions) : undefined)

  const totalTasksResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(roadmapTasks)
  const totalTasks = totalTasksResult[0]?.count ?? 0

  const progressCounts = await db
    .select({
      userId: userProgress.userId,
      completed: sql<number>`count(*)::int`,
    })
    .from(userProgress)
    .groupBy(userProgress.userId)

  const progressMap = new Map(progressCounts.map((r) => [r.userId, r.completed]))

  return rows.map((u) => ({
    ...u,
    completedCount: progressMap.get(u.id) ?? 0,
    progressPct:
      totalTasks > 0 ? Math.round(((progressMap.get(u.id) ?? 0) / totalTasks) * 100) : 0,
  }))
}

export async function getUserDetail(userId: string) {
  const db = getDb()

  const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  const user = rows[0]
  if (!user) return null

  const progress = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))

  const totalTasksResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(roadmapTasks)
  const totalTasks = totalTasksResult[0]?.count ?? 0

  return {
    user,
    completedCount: progress.length,
    totalTasks,
    progressPct: totalTasks > 0 ? Math.round((progress.length / totalTasks) * 100) : 0,
    recentCompletions: progress
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
      .slice(0, 10),
  }
}
