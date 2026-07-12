'use client'

import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'roadmap-progress'

type ProgressMap = Record<string, boolean> // taskId -> completed

export function useLocalProgress() {
  const [progress, setProgress] = useState<ProgressMap>({})
  const [hydrated, setHydrated] = useState(false)

  // Read localStorage only after mount — reading during render would cause
  // a server/client hydration mismatch (plainsight failure mode #12).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setProgress(JSON.parse(raw))
    } catch {
      // localStorage unavailable (private browsing, etc.) — fail silently, progress just won't persist
    }
    setHydrated(true)
  }, [])

  const toggleTask = useCallback((taskId: string) => {
    setProgress((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore write failures
      }
      return next
    })
  }, [])

  const isComplete = useCallback((taskId: string) => Boolean(progress[taskId]), [progress])

  const completedCount = Object.values(progress).filter(Boolean).length

  return { progress, toggleTask, isComplete, completedCount, hydrated }
}
