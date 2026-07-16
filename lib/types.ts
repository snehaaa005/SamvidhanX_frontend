import type { SuggestedQuestion } from '@/lib/questions'

export type Role = 'user' | 'assistant'

export type Feedback = 'like' | 'dislike' | null

export interface Message {
  id: string
  role: Role
  content: string
  createdAt: number
  /** assistant-only runtime states */
  status?: 'pending' | 'done' | 'error'
  bookmarked?: boolean
  feedback?: Feedback
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
  /** suggested questions generated for this chat */
  suggested: SuggestedQuestion[]
}
