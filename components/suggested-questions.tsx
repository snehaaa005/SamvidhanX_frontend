'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { QuestionIcon } from '@/components/question-icon'
import type { SuggestedQuestion } from '@/lib/questions'

export function SuggestedQuestions({
  questions,
  onSelect,
}: {
  questions: SuggestedQuestion[]
  onSelect: (question: string) => void
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {questions.map((q, i) => (
        <motion.button
          key={q.text}
          type="button"
          onClick={() => onSelect(q.text)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-shadow hover:border-accent/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <QuestionIcon name={q.icon} className="size-4.5" />
          </span>
          <span className="flex-1 pt-0.5 text-sm font-medium text-card-foreground">
            {q.text}
          </span>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.button>
      ))}
    </div>
  )
}
