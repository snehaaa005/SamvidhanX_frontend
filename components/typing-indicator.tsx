'use client'

import { motion } from 'framer-motion'
import { Logo } from '@/components/logo'

export function TypingIndicator() {
  return (
    <div className="flex w-full gap-3 md:gap-4">
      <Logo className="size-9 shrink-0" iconClassName="size-4.5" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-muted-foreground">
            SamvidhanX is thinking
          </span>
          <span className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="size-1.5 rounded-full bg-accent"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </span>
        </div>
        {/* Skeleton lines */}
        <div className="space-y-2 pl-1">
          {['85%', '95%', '70%'].map((w, i) => (
            <motion.div
              key={i}
              className="h-3 rounded-full bg-muted"
              style={{ width: w }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
