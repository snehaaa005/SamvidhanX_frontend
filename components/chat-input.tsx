'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChat } from '@/components/chat-provider'

export function ChatInput() {
  const { sendMessage, isLoading } = useChat()
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-grow the textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  const submit = () => {
    const text = value.trim()
    if (!text || isLoading) return
    sendMessage(text)
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Respect IME composition (CJK) before submitting on Enter.
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229
    ) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-3xl px-4 py-3 md:py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="flex items-end gap-2 rounded-3xl border border-border bg-card p-2 pl-4 shadow-sm transition-shadow focus-within:border-accent/50 focus-within:shadow-md"
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
            placeholder="Ask your constitutional question..."
            aria-label="Ask your constitutional question"
            className="max-h-[200px] flex-1 resize-none bg-transparent py-2 text-[0.95rem] leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60 scrollbar-thin"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!value.trim() || isLoading}
            aria-label="Send message"
            className="size-10 shrink-0 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <ArrowUp className="size-5" />
          </Button>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          SamvidhanX provides AI-generated information and may not always be
          accurate. Verify important details.
        </p>
      </div>
    </div>
  )
}
