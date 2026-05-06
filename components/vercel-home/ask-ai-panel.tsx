'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy,
  Share,
  Trash2,
  ChevronsRight,
  ArrowUp,
  Square,
} from 'lucide-react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export function AskAIPanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const text = input.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsGenerating(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          'This is a demo AI response. Later this panel can be connected to Vercel AI Gateway or OpenAI API.',
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsGenerating(false)
    }, 900)
  }

  function clearChat() {
    setMessages([])
    setInput('')
    setIsGenerating(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[1px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed right-0 top-0 z-[100] flex h-screen w-full flex-col border-l border-white/[0.08] bg-black text-white shadow-2xl sm:w-[420px] lg:w-[430px]"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">
                Ask AI
              </h2>

              <div className="flex items-center gap-1.5 text-white/45">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/[0.06] hover:text-white"
                  aria-label="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/[0.06] hover:text-white"
                  aria-label="Share"
                >
                  <Share className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={clearChat}
                  className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/[0.06] hover:text-white"
                  aria-label="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/[0.06] hover:text-white"
                  aria-label="Close panel"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center">
                  <div>
                    <p className="text-[18px] font-semibold text-white">
                      How can I help?
                    </p>
                    <p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-white/40">
                      Ask about pricing, services, booking systems, dashboards, or custom websites.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[82%] rounded-[22px] px-4 py-3 text-[14px] leading-6 ${
                          message.role === 'user'
                            ? 'rounded-br-md bg-white/[0.08] text-white'
                            : 'rounded-bl-md border border-white/[0.08] bg-white/[0.03] text-white/72'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="rounded-[22px] rounded-bl-md border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white/45">
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-white/[0.08] p-4">
              <form
                onSubmit={handleSubmit}
                className="relative min-h-[116px] rounded-2xl border border-white/[0.16] bg-black px-4 py-3 transition focus-within:border-white/[0.28]"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="h-[68px] w-full resize-none bg-transparent pr-12 text-[15px] leading-6 text-white outline-none placeholder:text-white/35"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                />

                <button
                  type={isGenerating ? 'button' : 'submit'}
                  onClick={isGenerating ? () => setIsGenerating(false) : undefined}
                  className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!input.trim() && !isGenerating}
                  aria-label={isGenerating ? 'Stop' : 'Send'}
                >
                  {isGenerating ? (
                    <Square className="h-3.5 w-3.5 fill-black" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
