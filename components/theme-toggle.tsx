'use client'

import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useChat } from '@/components/chat-provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useChat()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="size-4.5" />
          ) : (
            <Sun className="size-4.5" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
