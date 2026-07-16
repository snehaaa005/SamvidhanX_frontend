'use client'

import {
  Bookmark,
  Info,
  MessageSquare,
  Plus,
  Trash2,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useChat } from '@/components/chat-provider'
import { cn } from '@/lib/utils'

export function Sidebar({
  onOpenBookmarks,
  onOpenAbout,
  onNavigate,
}: {
  onOpenBookmarks: () => void
  onOpenAbout: () => void
  onNavigate?: () => void
}) {
  const {
    conversations,
    activeId,
    newChat,
    selectChat,
    deleteChat,
    bookmarks,
  } = useChat()

  const recent = conversations.filter((c) => c.messages.length > 0)

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4">
        <Logo className="size-9" iconClassName="size-5" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-sidebar-accent-foreground">
            SamvidhanX
          </p>
          <p className="text-[11px] text-sidebar-foreground/70">
            Constitutional AI
          </p>
        </div>
      </div>

      {/* New chat */}
      <div className="px-3">
        <Button
          onClick={() => {
            newChat()
            onNavigate?.()
          }}
          className="w-full justify-start gap-2 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
        >
          <Plus className="size-4" />
          New Chat
        </Button>
      </div>

      {/* Recent chats */}
      <div className="mt-5 flex min-h-0 flex-1 flex-col px-3">
        <p className="px-2 pb-2 text-[11px] font-semibold tracking-wide text-sidebar-foreground/50 uppercase">
          Recent Chats
        </p>
        <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto scrollbar-thin">
          {recent.length === 0 ? (
            <p className="px-2 py-2 text-xs text-sidebar-foreground/50">
              Your conversations will appear here.
            </p>
          ) : (
            recent.map((c) => (
              <div
                key={c.id}
                className={cn(
                  'group flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors',
                  c.id === activeId
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60',
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    selectChat(c.id)
                    onNavigate?.()
                  }}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <MessageSquare className="size-4 shrink-0 opacity-70" />
                  <span className="truncate">{c.title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteChat(c.id)}
                  aria-label={`Delete chat: ${c.title}`}
                  className="shrink-0 rounded-md p-1 text-sidebar-foreground/50 opacity-0 transition-opacity hover:text-sidebar-accent-foreground group-hover:opacity-100"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))
          )}
        </nav>
      </div>

      {/* Nav actions */}
      <div className="space-y-0.5 border-t border-sidebar-border px-3 py-3">
        <button
          type="button"
          onClick={onOpenBookmarks}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60"
        >
          <Bookmark className="size-4 opacity-80" />
          <span className="flex-1 text-left">Bookmarks</span>
          {bookmarks.length > 0 && (
            <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
              {bookmarks.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onOpenAbout}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60"
        >
          <Info className="size-4 opacity-80" />
          <span className="flex-1 text-left">About</span>
        </button>
      </div>

      {/* Footer badges */}
      <div className="border-t border-sidebar-border px-4 py-3.5">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-sidebar-accent/60 px-2 py-1 text-[10px] font-medium text-sidebar-accent-foreground">
            Powered by Gemini AI
          </span>
          <span className="rounded-full bg-green/15 px-2 py-1 text-[10px] font-medium text-green">
            RAG Enabled
          </span>
        </div>
        <p className="mt-2 text-[10px] text-sidebar-foreground/50">
          Version 1.0
        </p>
      </div>
    </div>
  )
}
