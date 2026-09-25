'use client'

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Sparkles, X, ArrowUp } from 'lucide-react'
import { suggestedQuestions } from '@/data/profile'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    const userMessage: Message = { role: 'user', content: text }
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.ok ? data.content : 'Sorry, something went wrong. Please try again.',
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant"
        className={cn(
          'fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[var(--ink)] py-2 pl-2 pr-5 text-white shadow-xl transition-transform hover:-translate-y-0.5',
          open && 'pointer-events-none opacity-0',
        )}
      >
        <span
          className="grid h-9 w-9 place-items-center rounded-full text-white"
          style={{ background: 'var(--grad)' }}
        >
          <Sparkles size={16} />
        </span>
        <span className="text-[14px] font-medium">Ask my AI</span>
        <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--mint)]" />
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI assistant"
        className={cn(
          'fixed z-50 flex flex-col overflow-hidden glass transition-all duration-300',
          'inset-x-0 bottom-0 h-[85dvh] rounded-t-[28px]',
          'sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[560px] sm:w-[380px] sm:rounded-[28px]',
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ background: 'var(--grad)' }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-[14px] font-semibold text-white">Hamza&apos;s AI Assistant</p>
              <p className="flex items-center gap-1.5 text-[11.5px] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)]" /> Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4 no-scrollbar">
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-[12.5px] text-[var(--on-ink-muted)]">Suggested questions</p>
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="block w-full rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-left text-[13px] text-white hover:bg-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'md max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed',
                  m.role === 'user'
                    ? 'rounded-br-sm bg-white font-medium text-[var(--ink)]'
                    : 'rounded-bl-sm bg-white/[0.08] text-[var(--on-ink)]',
                )}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-white/[0.08] px-4 py-3 text-white">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="border-t border-white/10 p-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-1.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              disabled={loading}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-white placeholder:text-[var(--on-ink-dim)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="grid h-8 w-8 flex-none place-items-center rounded-full text-white disabled:opacity-40"
              style={{ background: 'var(--grad)' }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
