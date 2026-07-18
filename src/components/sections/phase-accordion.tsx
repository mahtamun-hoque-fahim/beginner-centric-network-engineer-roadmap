'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocalProgress } from '@/lib/hooks/use-local-progress'
import { getRandomQuote } from '@/lib/quotes'
import { TaskRow } from '@/components/ui/task-row'
import { QuoteToast } from '@/components/ui/quote-toast'

type Task = {
  id: string
  title: string
  scenario: string
  resources: { label: string; url: string; type: 'free' | 'paid' }[] | null
}

type Phase = {
  id: string
  title: string
  description: string | null
  tasks: Task[]
}

export function PhaseAccordion({ phases }: { phases: Phase[] }) {
  const [openPhase, setOpenPhase] = useState<string | null>(phases[0]?.id ?? null)
  const [quote, setQuote] = useState<string | null>(null)
  const { toggleTask, isComplete, completedCount, hydrated } = useLocalProgress()

  const totalTasks = phases.reduce((sum, p) => sum + p.tasks.length, 0)
  const progressPct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0

  function handleToggle(taskId: string) {
    const willComplete = !isComplete(taskId)
    toggleTask(taskId)
    if (willComplete) setQuote(getRandomQuote())
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-text-muted mb-2">
          <span>{hydrated ? `${completedCount} of ${totalTasks} tasks complete` : 'Loading progress...'}</span>
          <span>{hydrated ? `${progressPct}%` : ''}</span>
        </div>
        <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
          <div
            className="bg-accent h-full transition-[width] duration-300 ease-[var(--ease-out)]"
            style={{ width: hydrated ? `${progressPct}%` : '0%' }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {phases.map((phase) => {
          const isOpen = openPhase === phase.id
          const phaseCompleted = phase.tasks.filter((t) => isComplete(t.id)).length

          return (
            <div
              key={phase.id}
              className="bg-surface-elevated border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={isOpen}
              >
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-text">{phase.title}</h2>
                  {phase.description && (
                    <p className="text-text-muted text-sm mt-1">{phase.description}</p>
                  )}
                  <p
                    className="text-text-faint text-xs mt-2"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {phaseCompleted}/{phase.tasks.length} DONE
                  </p>
                </div>
                <ChevronDown
                  className={`size-5 shrink-0 text-text-muted transition-transform duration-200 ease-[var(--ease-out)] ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 flex flex-col gap-3">
                  {phase.tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      title={task.title}
                      scenario={task.scenario}
                      resources={task.resources}
                      completed={isComplete(task.id)}
                      onToggle={() => handleToggle(task.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <QuoteToast quote={quote} onDone={() => setQuote(null)} />
    </div>
  )
}
