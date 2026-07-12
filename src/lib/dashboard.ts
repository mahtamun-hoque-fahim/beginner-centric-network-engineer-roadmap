import { getDb } from '@/lib/db'
import { roadmapPhases, roadmapTasks, userProgress } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'

export async function getUserDashboardStats(userId: string) {
  const db = getDb()

  const phases = await db.select().from(roadmapPhases).orderBy(asc(roadmapPhases.order))
  const tasks = await db.select().from(roadmapTasks).orderBy(asc(roadmapTasks.order))
  const progress = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))

  const completedIds = new Set(progress.map((p) => p.taskId))
  const totalTasks = tasks.length
  const completedCount = completedIds.size
  const progressPct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0

  // Current phase = first phase with at least one incomplete task
  let currentPhase = phases[phases.length - 1] ?? null
  for (const phase of phases) {
    const phaseTasks = tasks.filter((t) => t.phaseId === phase.id)
    const allDone = phaseTasks.length > 0 && phaseTasks.every((t) => completedIds.has(t.id))
    if (!allDone) {
      currentPhase = phase
      break
    }
  }

  // Streak = consecutive days (including today) with at least one completion
  const completionDates = new Set(
    progress.map((p) => p.completedAt.toISOString().slice(0, 10))
  )
  let streak = 0
  const cursor = new Date()
  while (completionDates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  const roadmapComplete = totalTasks > 0 && completedCount === totalTasks

  return {
    totalTasks,
    completedCount,
    progressPct,
    currentPhase,
    streak,
    roadmapComplete,
  }
}
