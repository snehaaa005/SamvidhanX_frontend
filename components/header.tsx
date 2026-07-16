'use client'

import { Menu, SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { useChat } from '@/components/chat-provider'

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { newChat, activeConversation } = useChat()
  const title =
    activeConversation && activeConversation.messages.length > 0
      ? activeConversation.title
      : 'Indian Constitutional AI Assistant'

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur md:px-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Logo className="size-8 md:hidden" iconClassName="size-4" />
        <p className="truncate text-sm font-semibold text-foreground">
          {title}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={newChat}
        aria-label="New chat"
      >
        <SquarePen className="size-5" />
      </Button>
      <ThemeToggle />
    </header>
  )
}
