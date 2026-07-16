'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { askQuestion, ApiError } from '@/lib/api'
import { getRandomQuestions } from '@/lib/questions'
import type { Conversation, Feedback, Message } from '@/lib/types'

const STORAGE_KEY = 'samvidhanx-conversations'
const THEME_KEY = 'samvidhanx-theme'

type Theme = 'light' | 'dark'

interface ChatContextValue {
  conversations: Conversation[]
  activeId: string | null
  activeConversation: Conversation | null
  bookmarks: { conversationId: string; message: Message }[]
  isLoading: boolean
  theme: Theme
  toggleTheme: () => void
  sendMessage: (question: string) => void
  regenerate: (assistantId: string) => void
  newChat: () => void
  selectChat: (id: string) => void
  deleteChat: (id: string) => void
  toggleBookmark: (messageId: string) => void
  setFeedback: (messageId: string, feedback: Feedback) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

function createConversation(): Conversation {
  const now = Date.now()
  return {
    id: uid(),
    title: 'New Chat',
    messages: [],
    createdAt: now,
    updatedAt: now,
    suggested: getRandomQuestions(6),
  }
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')
  const [hydrated, setHydrated] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed: Conversation[] = raw ? JSON.parse(raw) : []
      if (parsed.length > 0) {
        setConversations(parsed)
        setActiveId(parsed[0].id)
      } else {
        const c = createConversation()
        setConversations([c])
        setActiveId(c.id)
      }
    } catch {
      const c = createConversation()
      setConversations([c])
      setActiveId(c.id)
    }

    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(storedTheme ?? (prefersDark ? 'dark' : 'light'))
    setHydrated(true)
  }, [])

  // Persist conversations
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
    } catch {
      /* ignore quota errors */
    }
  }, [conversations, hydrated])

  // Apply + persist theme
  useEffect(() => {
    if (!hydrated) return
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme, hydrated])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const patchMessage = useCallback(
    (conversationId: string, messageId: string, patch: Partial<Message>) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === messageId ? { ...m, ...patch } : m,
                ),
              }
            : c,
        ),
      )
    },
    [],
  )

  const runRequest = useCallback(
    async (conversationId: string, assistantId: string, question: string) => {
      setIsLoading(true)
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      try {
        const answer = await askQuestion(question, controller.signal)
        patchMessage(conversationId, assistantId, {
          content:
            answer ||
            'No response was returned. Please try rephrasing your question.',
          status: 'done',
        })
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        const message =
          err instanceof ApiError
            ? err.message
            : 'Something went wrong while retrieving constitutional information.'
        patchMessage(conversationId, assistantId, {
          content: message,
          status: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    },
    [patchMessage],
  )

  const sendMessage = useCallback(
    (raw: string) => {
      const question = raw.trim()
      if (!question || isLoading) return
      const conversationId = activeId
      if (!conversationId) return

      const userMsg: Message = {
        id: uid(),
        role: 'user',
        content: question,
        createdAt: Date.now(),
      }
      const assistantMsg: Message = {
        id: uid(),
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
        status: 'pending',
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c
          const isFirst = c.messages.length === 0
          return {
            ...c,
            title: isFirst
              ? question.slice(0, 48) + (question.length > 48 ? '…' : '')
              : c.title,
            messages: [...c.messages, userMsg, assistantMsg],
            updatedAt: Date.now(),
          }
        }),
      )

      void runRequest(conversationId, assistantMsg.id, question)
    },
    [activeId, isLoading, runRequest],
  )

  const regenerate = useCallback(
    (assistantId: string) => {
      if (isLoading) return
      const conversation = conversations.find((c) =>
        c.messages.some((m) => m.id === assistantId),
      )
      if (!conversation) return
      const idx = conversation.messages.findIndex((m) => m.id === assistantId)
      // Find the preceding user message
      let question = ''
      for (let i = idx - 1; i >= 0; i--) {
        if (conversation.messages[i].role === 'user') {
          question = conversation.messages[i].content
          break
        }
      }
      if (!question) return
      patchMessage(conversation.id, assistantId, {
        content: '',
        status: 'pending',
        feedback: null,
      })
      void runRequest(conversation.id, assistantId, question)
    },
    [conversations, isLoading, patchMessage, runRequest],
  )

  const newChat = useCallback(() => {
    setConversations((prev) => {
      // Reuse an existing empty chat if present
      const existingEmpty = prev.find((c) => c.messages.length === 0)
      if (existingEmpty) {
        setActiveId(existingEmpty.id)
        return prev.map((c) =>
          c.id === existingEmpty.id
            ? { ...c, suggested: getRandomQuestions(6) }
            : c,
        )
      }
      const c = createConversation()
      setActiveId(c.id)
      return [c, ...prev]
    })
  }, [])

  const selectChat = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  const deleteChat = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id)
        if (next.length === 0) {
          const c = createConversation()
          setActiveId(c.id)
          return [c]
        }
        if (id === activeId) setActiveId(next[0].id)
        return next
      })
    },
    [activeId],
  )

  const toggleBookmark = useCallback(
    (messageId: string) => {
      setConversations((prev) =>
        prev.map((c) => ({
          ...c,
          messages: c.messages.map((m) =>
            m.id === messageId ? { ...m, bookmarked: !m.bookmarked } : m,
          ),
        })),
      )
    },
    [],
  )

  const setFeedback = useCallback(
    (messageId: string, feedback: Feedback) => {
      setConversations((prev) =>
        prev.map((c) => ({
          ...c,
          messages: c.messages.map((m) =>
            m.id === messageId
              ? { ...m, feedback: m.feedback === feedback ? null : feedback }
              : m,
          ),
        })),
      )
    },
    [],
  )

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  )

  const bookmarks = useMemo(
    () =>
      conversations.flatMap((c) =>
        c.messages
          .filter((m) => m.bookmarked)
          .map((message) => ({ conversationId: c.id, message })),
      ),
    [conversations],
  )

  const value: ChatContextValue = {
    conversations,
    activeId,
    activeConversation,
    bookmarks,
    isLoading,
    theme,
    toggleTheme,
    sendMessage,
    regenerate,
    newChat,
    selectChat,
    deleteChat,
    toggleBookmark,
    setFeedback,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
