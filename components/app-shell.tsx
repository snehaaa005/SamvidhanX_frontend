'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { ChatWindow } from '@/components/chat-window'
import { ChatInput } from '@/components/chat-input'
import { AboutDialog } from '@/components/about-dialog'
import { BookmarksDialog } from '@/components/bookmarks-dialog'

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bookmarksOpen, setBookmarksOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border md:block">
        <Sidebar
          onOpenBookmarks={() => setBookmarksOpen(true)}
          onOpenAbout={() => setAboutOpen(true)}
        />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-xl"
            >
              <Sidebar
                onOpenBookmarks={() => {
                  closeDrawer()
                  setBookmarksOpen(true)
                }}
                onOpenAbout={() => {
                  closeDrawer()
                  setAboutOpen(true)
                }}
                onNavigate={closeDrawer}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setDrawerOpen(true)} />
        <ChatWindow />
        <ChatInput />
      </div>

      <BookmarksDialog
        open={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
      />
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}
