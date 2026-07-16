'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useChat } from '@/components/chat-provider'
import { EmptyState } from '@/components/empty-state'
import { UserMessage } from '@/components/user-message'
import { AssistantMessage } from '@/components/assistant-message'
import { TypingIndicator } from '@/components/typing-indicator'

export function ChatWindow() {
  const { activeConversation, sendMessage, isLoading } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = activeConversation?.messages ?? []
  const isEmpty = messages.length === 0

  // The last assistant message is "pending" while waiting on the backend.
  const lastMessage = messages[messages.length - 1]
  const showTyping =
    isLoading &&
    lastMessage?.role === 'assistant' &&
    lastMessage.status === 'pending'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, showTyping])

  if (isEmpty) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <EmptyState
          suggested={activeConversation?.suggested ?? []}
          onSelect={sendMessage}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:py-8">
        <AnimatePresence initial={false}>
          {messages.map((message) =>
            message.role === 'user' ? (
              <UserMessage key={message.id} message={message} />
            ) : message.status === 'pending' ? null : (
              <AssistantMessage key={message.id} message={message} />
            ),
          )}
        </AnimatePresence>

        {showTyping && <TypingIndicator />}

        <div ref={bottomRef} className="h-px" />
      </div>
    </div>
  )
}
