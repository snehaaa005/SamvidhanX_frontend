'use client'

import { motion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Markdown } from '@/components/markdown'
import { MessageActions } from '@/components/message-actions'
import { cn } from '@/lib/utils'
import type { Message } from '@/lib/types'

export function AssistantMessage({ message }: { message: Message }) {
  const isError = message.status === 'error'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group/message flex w-full gap-3 md:gap-4"
    >
      <Logo className="size-9 shrink-0" iconClassName="size-4.5" />

      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'rounded-2xl rounded-tl-md border bg-card px-4 py-3 shadow-sm',
            isError
              ? 'border-destructive/30 bg-destructive/5'
              : 'border-border',
          )}
        >
          {isError ? (
            <div className="flex items-start gap-2.5 text-sm text-destructive">
              <TriangleAlert className="mt-0.5 size-4.5 shrink-0" />
              <span className="leading-relaxed">{message.content}</span>
            </div>
          ) : (
            <Markdown content={message.content} />
          )}
        </div>

        {message.status === 'done' && (
          <div className="mt-1.5 opacity-0 transition-opacity duration-150 group-hover/message:opacity-100 focus-within:opacity-100">
            <MessageActions message={message} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
