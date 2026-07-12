import { getDb } from '@/lib/db'
import { roadmapPhases, roadmapTasks } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'

export async function getCurriculum() {
  const db = getDb()
  const phases = await db.select().from(roadmapPhases).orderBy(asc(roadmapPhases.order))

  const phasesWithTasks = await Promise.all(
    phases.map(async (phase) => {
      const tasks = await db
        .select()
        .from(roadmapTasks)
        .where(eq(roadmapTasks.phaseId, phase.id))
        .orderBy(asc(roadmapTasks.order))
      return { ...phase, tasks }
    })
  )

  return phasesWithTasks
}
