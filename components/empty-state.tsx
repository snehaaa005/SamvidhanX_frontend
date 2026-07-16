'use client'

import { motion } from 'framer-motion'
import { Logo } from '@/components/logo'
import { SuggestedQuestions } from '@/components/suggested-questions'
import type { SuggestedQuestion } from '@/lib/questions'

const TOPICS = [
  'Constitutional Articles',
  'Fundamental Rights',
  'Fundamental Duties',
  'Directive Principles',
  'Parliament',
  'Judiciary',
  'Elections',
  'Citizenship',
  'Emergency Provisions',
  'Constitutional Amendments',
  'Schedules',
]

export function EmptyState({
  suggested,
  onSelect,
}: {
  suggested: SuggestedQuestion[]
  onSelect: (question: string) => void
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Logo className="size-16 rounded-2xl" iconClassName="size-8" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
      >
        SamvidhanX
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-1.5 text-lg font-semibold text-accent"
      >
        Indian Constitutional AI Assistant
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-3 max-w-md text-center text-pretty text-muted-foreground"
      >
        Ask anything about the Constitution of India and get AI-powered answers
        on:
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4 flex flex-wrap justify-center gap-2"
      >
        {TOPICS.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </motion.div>

      <div className="mt-10 w-full">
        <SuggestedQuestions questions={suggested} onSelect={onSelect} />
      </div>
    </div>
  )
}
