'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks, profile } from '@/data/profile'
import { cn } from '@/lib/utils'

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="grid h-8 w-8 place-items-center rounded-full text-[13px] font-semibold text-white"
        style={{ background: 'var(--grad)' }}
      >
        HB
      </span>
      <span className="text-[15px] font-semibold text-white">Hamza Beizig</span>
    </span>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#about')
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // lock scroll + Esc close + focus trap for the mobile menu
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    menuRef.current?.querySelector<HTMLElement>('a,button')?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
        <nav
          aria-label="Primary"
          className={cn(
            'pointer-events-auto flex w-full max-w-[1180px] items-center justify-between rounded-full border px-3 py-2 pl-4 transition-all duration-300',
            scrolled
              ? 'border-white/10 bg-[rgba(10,12,18,0.8)] backdrop-blur-xl'
              : 'border-white/10 bg-[rgba(22,26,38,0.5)] backdrop-blur-md',
          )}
        >
          <a href="#about" aria-label="Home">
            <Logo />
          </a>

          <div className="hidden items-center gap-1 min-[961px]:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-[14px] transition-colors',
                  active === l.href
                    ? 'bg-white/10 text-white'
                    : 'text-[var(--on-ink-muted)] hover:text-white',
                )}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[14px] font-medium text-[var(--ink)] min-[961px]:inline-flex"
          >
            Let&apos;s talk <ArrowUpRight size={15} strokeWidth={2.25} />
          </a>

          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-[var(--ink)] min-[961px]:hidden"
          >
            <Menu size={18} />
          </button>
        </nav>
      </div>

      {/* Fullscreen mobile menu */}
      <div
        ref={menuRef}
        className={cn(
          'fixed inset-0 z-[60] flex flex-col bg-[var(--ink)] p-6 transition-all duration-300 min-[961px]:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-10 flex flex-1 flex-col justify-center gap-2">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[40px] font-semibold tracking-tight text-white transition-transform hover:translate-x-1"
              style={{
                transitionDelay: open ? `${i * 40}ms` : '0ms',
                transform: open ? 'none' : 'translateY(10px)',
                opacity: open ? 1 : 0,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="btn btn-white justify-center"
        >
          Let&apos;s talk
          <span className="bubble" aria-hidden>
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </span>
        </a>
        <a href={profile.linkedin} className="mt-4 text-center text-[13px] text-[var(--on-ink-dim)]">
          LinkedIn ↗
        </a>
      </div>
    </>
  )
}
