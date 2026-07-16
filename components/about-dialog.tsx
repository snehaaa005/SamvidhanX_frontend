'use client'

import { Database, ShieldCheck, Sparkles } from 'lucide-react'
import { Modal } from '@/components/modal'
import { Logo } from '@/components/logo'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Powered by Gemini AI',
    text: 'Advanced language understanding for nuanced constitutional queries.',
  },
  {
    icon: Database,
    title: 'RAG Enabled',
    text: 'Retrieval-augmented generation grounded in the Constitution of India.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Focused',
    text: 'Purpose-built to answer questions on Indian constitutional law.',
  },
]

export function AboutDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Modal open={open} onClose={onClose} title="About SamvidhanX">
      <div className="flex flex-col items-center pb-2 text-center">
        <Logo className="size-14 rounded-2xl" iconClassName="size-7" />
        <h3 className="mt-3 text-xl font-bold text-foreground">SamvidhanX</h3>
        <p className="text-sm font-medium text-accent">
          Indian Constitutional AI Assistant
        </p>
        <p className="mt-3 max-w-sm text-pretty text-sm text-muted-foreground">
          SamvidhanX helps you explore and understand the Constitution of India
          — from fundamental rights and duties to the judiciary, parliament,
          amendments and beyond.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <f.icon className="size-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {f.title}
              </p>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Version 1.0
      </p>
    </Modal>
  )
}
