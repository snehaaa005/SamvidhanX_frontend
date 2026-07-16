'use client'

import { useState } from 'react'
import {
  Bookmark,
  Check,
  Copy,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChat } from '@/components/chat-provider'
import { cn } from '@/lib/utils'
import type { Message } from '@/lib/types'

export function MessageActions({ message }: { message: Message }) {
  const { regenerate, toggleBookmark, setFeedback, isLoading } = useChat()
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'SamvidhanX – Constitutional Answer',
      text: message.content,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(message.content)
        setShared(true)
        setTimeout(() => setShared(false), 1500)
      }
    } catch {
      /* user cancelled or unsupported */
    }
  }

  const actionBtn =
    'size-7 rounded-lg text-muted-foreground hover:text-foreground'

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon-sm"
        className={actionBtn}
        onClick={handleCopy}
        aria-label="Copy answer"
      >
        {copied ? (
          <Check className="size-4 text-green" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className={actionBtn}
        onClick={() => regenerate(message.id)}
        disabled={isLoading}
        aria-label="Regenerate answer"
      >
        <RefreshCw className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          actionBtn,
          message.bookmarked && 'text-accent hover:text-accent',
        )}
        onClick={() => toggleBookmark(message.id)}
        aria-label={message.bookmarked ? 'Remove bookmark' : 'Bookmark answer'}
        aria-pressed={message.bookmarked}
      >
        <Bookmark
          className={cn('size-4', message.bookmarked && 'fill-current')}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          actionBtn,
          message.feedback === 'like' && 'text-green hover:text-green',
        )}
        onClick={() => setFeedback(message.id, 'like')}
        aria-label="Like answer"
        aria-pressed={message.feedback === 'like'}
      >
        <ThumbsUp
          className={cn('size-4', message.feedback === 'like' && 'fill-current')}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          actionBtn,
          message.feedback === 'dislike' && 'text-destructive hover:text-destructive',
        )}
        onClick={() => setFeedback(message.id, 'dislike')}
        aria-label="Dislike answer"
        aria-pressed={message.feedback === 'dislike'}
      >
        <ThumbsDown
          className={cn(
            'size-4',
            message.feedback === 'dislike' && 'fill-current',
          )}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className={actionBtn}
        onClick={handleShare}
        aria-label="Share answer"
      >
        {shared ? (
          <Check className="size-4 text-green" />
        ) : (
          <Share2 className="size-4" />
        )}
      </Button>
    </div>
  )
}
