'use client'

import { motion } from 'framer-motion'
import type { Message } from '@/lib/types'

export function UserMessage({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full justify-end"
    >
      <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 text-primary-foreground shadow-sm md:max-w-[75%]">
        <p className="text-[0.95rem] leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </motion.div>
  )
}
