'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { testimonials, companies } from '@/data/profile'
import { SectionHeader } from '@/components/kit/SectionHeading'
import Reveal from '@/components/kit/Reveal'
import Carousel from '@/components/kit/Carousel'
import Marquee from '@/components/kit/Marquee'
import SpectrumLine from '@/components/kit/SpectrumLine'
import { cn } from '@/lib/utils'

function Quote({ text, accent }: { text: string; accent: string }) {
  const idx = text.toLowerCase().indexOf(accent.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-serif-accent text-grad">{text.slice(idx, idx + accent.length)}</span>
      {text.slice(idx + accent.length)}
    </>
  )
}

function Stars({ dark }: { dark?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={cn(
            'transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110',
            dark ? 'text-[var(--amber)]' : 'text-[var(--amber)]',
          )}
          style={{ transitionDelay: `${i * 40}ms` }}
          fill="currentColor"
        />
      ))}
    </div>
  )
}

function Card({ index }: { index: number }) {
  const t = testimonials[index]
  const dark = index === 0
  return (
    <div
      className={cn(
        'group relative h-full overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-1',
        dark ? 'card-ink' : 'card pb-12',
      )}
    >
      {dark && (
        <div
          className="halo transition-transform duration-500 group-hover:scale-125"
          style={{ top: -60, right: -30, width: 240, height: 240, background: 'var(--blue)' }}
        />
      )}
      {/* Top accent bar fades in on hover, same as the Stats cards */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'var(--grad)' }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <Stars dark={dark} />
        <p
          className={cn(
            'mt-5 flex-1 text-[18px] font-medium leading-relaxed',
            dark ? 'text-white' : 'text-[var(--text)]',
          )}
        >
          <Quote text={t.quote} accent={t.accent} />
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Image
            src={t.avatar}
            alt={t.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:ring-[var(--violet)]/40"
          />
          <div>
            <p className={cn('text-[14px] font-semibold', dark ? 'text-white' : 'text-[var(--text)]')}>
              {t.name}
            </p>
            <p className={cn('text-[12.5px]', dark ? 'text-[var(--on-ink-muted)]' : 'text-[var(--muted)]')}>
              {t.role}
            </p>
          </div>
        </div>
      </div>
      {!dark && <SpectrumLine className="opacity-70 transition-opacity duration-300 group-hover:opacity-100" />}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-28">
      <SectionHeader eyebrow="Testimonials" title="People I've *built* with." className="mb-12" />

      {/* Desktop grid */}
      <div className="hidden grid-cols-2 gap-5 min-[961px]:grid">
        {testimonials.map((_, i) => (
          <Reveal key={i} delay={i * 80}>
            <Card index={i} />
          </Reveal>
        ))}
      </div>

      {/* Mobile / tablet portrait carousel */}
      <div className="min-[961px]:hidden">
        <Carousel slideClass="basis-[86%] sm:basis-[72%]">
          {testimonials.map((_, i) => (
            <Card key={i} index={i} />
          ))}
        </Carousel>
      </div>

      {/* Companies marquee */}
      <div className="mt-16">
        <p className="eyebrow mb-6 text-center">Companies I&apos;ve worked with</p>
        <Marquee
          items={companies.map((c) => (
            <span key={c} className="company-name text-[18px] font-semibold tracking-tight">
              {c}
            </span>
          ))}
        />
      </div>
    </section>
  )
}
