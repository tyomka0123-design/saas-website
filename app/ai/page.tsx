'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'

export default function AiPage() {
  const [input, setInput] = useState('')

  const { messages, sendMessage, status } = useChat()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-6xl">
        <div className="hidden md:block w-full border-r border-white/10" />

        <section className="ml-auto flex h-screen w-full max-w-[420px] flex-col border-l border-white/[0.08] bg-black">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
            <h1 className="text-[16px] font-semibold">Ask AI</h1>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-3xl px-4 py-3 text-[15px] leading-6 ${
                    message.role === 'user'
                      ? 'bg-white/[0.08] text-white'
                      : 'bg-white/[0.04] text-white/85'
                  }`}
                >
                  {message.parts?.map((part, i) =>
                    part.type === 'text' ? <span key={i}>{part.text}</span> : null
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!input.trim()) return
              sendMessage({ text: input })
              setInput('')
            }}
            className="border-t border-white/[0.08] p-4"
          >
            <div className="rounded-[28px] border border-white/[0.14] bg-black p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                rows={3}
                className="w-full resize-none bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={status === 'submitted' || status === 'streaming'}
                  className="flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-medium text-black disabled:opacity-50"
                >
                  {status === 'submitted' || status === 'streaming' ? 'Thinking...' : 'Send'}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
