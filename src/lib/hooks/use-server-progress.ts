'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'roadmap-progress' // shared key with useLocalProgress

export function useServerProgress() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      // 1. Merge any anonymous localStorage progress into the account first.
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const localMap: Record<string, boolean> = JSON.parse(raw)
          const taskIds = Object.entries(localMap)
            .filter(([, done]) => done)
            .map(([id]) => id)

          if (taskIds.length > 0) {
            await fetch('/api/progress', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ taskIds }),
            })
            // Clear local copy now that it lives on the account — avoids
            // re-merging stale state on every future login.
            window.localStorage.removeItem(STORAGE_KEY)
          }
        }
      } catch {
        // best-effort merge — a failure here shouldn't block loading progress
      }

      // 2. Load authoritative server state.
      const res = await fetch('/api/progress')
      if (res.ok) {
        const data = await res.json()
        setCompletedIds(new Set(data.taskIds))
      }
      setLoading(false)
    }

    init()
  }, [])

  const toggleTask = useCallback(async (taskId: string) => {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId }),
    })
    if (!res.ok) return { completed: false, quote: null }

    const data = await res.json()
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (data.completed) next.add(taskId)
      else next.delete(taskId)
      return next
    })
    return { completed: data.completed as boolean, quote: (data.quote as string | undefined) ?? null }
  }, [])

  const isComplete = useCallback((taskId: string) => completedIds.has(taskId), [completedIds])

  return { toggleTask, isComplete, completedCount: completedIds.size, loading }
}
