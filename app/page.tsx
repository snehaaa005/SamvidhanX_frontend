import { ChatProvider } from '@/components/chat-provider'
import { AppShell } from '@/components/app-shell'

export default function Page() {
  return (
    <ChatProvider>
      <AppShell />
    </ChatProvider>
  )
}
