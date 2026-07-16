'use client'

import { Bookmark, BookmarkX } from 'lucide-react'
import { Modal } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { useChat } from '@/components/chat-provider'

export function BookmarksDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { bookmarks, toggleBookmark, selectChat } = useChat()

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Bookmarks"
      description={
        bookmarks.length > 0
          ? `${bookmarks.length} saved answer${bookmarks.length > 1 ? 's' : ''}`
          : undefined
      }
    >
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Bookmark className="size-6" />
          </span>
          <p className="mt-3 text-sm font-medium text-foreground">
            No bookmarks yet
          </p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Save any answer using the bookmark icon to find it here later.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map(({ conversationId, message }) => (
            <li
              key={message.id}
              className="rounded-xl border border-border bg-background p-3"
            >
              <p className="line-clamp-3 text-sm text-card-foreground">
                {message.content}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto px-0 text-accent"
                  onClick={() => {
                    selectChat(conversationId)
                    onClose()
                  }}
                >
                  Open in chat
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove bookmark"
                  onClick={() => toggleBookmark(message.id)}
                >
                  <BookmarkX className="size-4 text-muted-foreground" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}
