'use client'

import Image from 'next/image'
import { Linkedin, Sparkles } from 'lucide-react'
import { profile, heroChat } from '@/data/profile'
import { AccentHeading } from '@/components/kit/SectionHeading'
import Button from '@/components/kit/Button'
import Nav from './Nav'

function CodeCard() {
  return (
    <div className="glass rounded-2xl p-3 font-mono text-[11px] leading-relaxed shadow-2xl">
      <div className="mb-1.5 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <pre className="whitespace-pre-wrap text-[var(--on-ink)]">
        <span className="text-[#7c5cff]">const</span> hamza = {'{'}
        {'\n'}  <span className="text-[#9aa3b8]">role</span>:{' '}
        <span className="text-[#22c58b]">&apos;Full-Stack&apos;</span>,{'\n'}  <span className="text-[#9aa3b8]">ai</span>:{' '}
        <span className="text-[#f5a524]">true</span>
        {'\n'}
        {'}'}
      </pre>
    </div>
  )
}

function ChatCard() {
  return (
    <div className="glass rounded-2xl p-3 shadow-2xl">
      <div className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-sm bg-white px-2.5 py-1.5 text-[11px] font-medium text-[var(--ink)]">
        {heroChat.question}
      </div>
      <div className="mt-1.5 flex items-start gap-1.5">
        <span
          className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full text-[9px] font-semibold text-white"
          style={{ background: 'var(--grad)' }}
        >
          HB
        </span>
        <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-[rgba(255,255,255,0.08)] px-2.5 py-1.5 text-[11px] leading-snug text-[var(--on-ink)]">
          {heroChat.answer}
        </div>
      </div>
    </div>
  )
}

/** Modern shape behind the photo: concentric rings + soft glow platform. */
function PhotoShape() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center">
      <svg
        viewBox="0 0 460 460"
        className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-[46%]"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2F6BFF" />
            <stop offset="1" stopColor="#7C5CFF" />
          </linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#2F6BFF" stopOpacity="0.35" />
            <stop offset="1" stopColor="#2F6BFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="230" cy="230" r="228" fill="url(#glow)" />
        <circle cx="230" cy="230" r="176" stroke="url(#ring)" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle
          cx="230"
          cy="230"
          r="205"
          stroke="url(#ring)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="2 10"
        />
        <circle cx="230" cy="230" r="150" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
      </svg>

      {/* glowing platform ellipse under the figure (the “track”) */}
      <div
        className="absolute bottom-[6%] h-10 w-[78%] rounded-[50%]"
        style={{
          background: 'radial-gradient(closest-side, rgba(124,92,255,0.55), transparent)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <header
      id="about"
      className="on-ink relative w-full overflow-hidden bg-[var(--ink)] pt-28 pb-[168px] sm:pb-[188px]"
    >
      <Nav />
      <div className="hero-grid" />
      <div className="halo" style={{ top: '-120px', left: '-60px', width: 420, height: 420, background: 'var(--blue)' }} />
      <div className="halo" style={{ top: '8%', right: '-80px', width: 460, height: 460, background: 'var(--violet)' }} />
      <div className="halo" style={{ bottom: '-60px', left: '32%', width: 380, height: 380, background: 'var(--mint)', opacity: 0.28 }} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 min-[961px]:grid-cols-[1.05fr_0.95fr] landscape-hero">
        {/* Left */}
        <div>
          <span className="pill glass px-3 py-1.5 text-[13px] text-[var(--on-ink)]">
            <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--mint)]" />
            Open to new opportunities
          </span>

          <AccentHeading
            tag="h1"
            className="h1 mt-6 text-white"
            text="Full-stack engineer, building with an *AI edge.*"
          />

          <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-[var(--on-ink-muted)]">
            I&apos;m Hamza — <strong className="font-semibold text-white">3+ years</strong> shipping clean,
            scalable software for teams in{' '}
            <strong className="font-semibold text-white">Tunisia, France, Luxembourg and Switzerland</strong>,
            with LLMs and AI agents wired in where they matter.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#work" variant="white" icon="right">
              View my work
            </Button>
            <Button href="#contact" variant="outline" bubble={false}>
              Get in touch
            </Button>
          </div>
        </div>

        {/* Right — figure with modern shape, no rectangle */}
        <div className="relative mx-auto aspect-square w-full max-w-[430px]">
          <PhotoShape />

          <div className="photo-fade relative z-10 h-full w-full">
            <Image
              src={profile.avatar}
              alt="Hamza Beizig holding a laptop"
              fill
              priority
              sizes="(max-width: 960px) 80vw, 430px"
              className="object-contain"
            />
          </div>

          {/* Floating glass cards (smaller, pushed to the edges) */}
          <div className="hero-chat absolute -left-3 top-6 z-20 w-[186px] sm:-left-8">
            <ChatCard />
          </div>
          <div className="hero-code absolute -right-3 bottom-[86px] z-20 w-[172px] sm:-right-7">
            <CodeCard />
          </div>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glass absolute bottom-2 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-white shadow-2xl transition-transform hover:-translate-y-0.5"
          >
            <Linkedin size={15} /> LinkedIn
            <Sparkles size={13} className="text-[var(--violet)]" />
          </a>
        </div>
      </div>

      {/* Wave divider into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] leading-[0]">
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="block h-[90px] w-full sm:h-[120px]">
          <path
            d="M0,42 C240,110 420,4 720,44 C1020,84 1230,120 1440,58 L1440,130 L0,130 Z"
            fill="var(--blue)"
            opacity="0.10"
          />
          <path
            d="M0,70 C260,120 460,30 720,64 C990,98 1220,128 1440,80 L1440,130 L0,130 Z"
            fill="var(--page)"
          />
        </svg>
      </div>
    </header>
  )
}
