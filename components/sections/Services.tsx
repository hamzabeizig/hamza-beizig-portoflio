'use client'

import { Code2, Sparkles, Gauge, ShieldCheck } from 'lucide-react'
import { services } from '@/data/profile'
import { SectionHeader } from '@/components/kit/SectionHeading'
import Reveal from '@/components/kit/Reveal'
import Carousel from '@/components/kit/Carousel'
import SpectrumLine from '@/components/kit/SpectrumLine'

const icons = [Code2, Sparkles, Gauge, ShieldCheck]

function ServiceCard({ index }: { index: number }) {
  const s = services[index]
  const Icon = icons[index]
  if (s.featured) {
    return (
      <div className="card-ink relative h-full overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-1">
        <div
          className="halo"
          style={{ top: -60, right: -40, width: 260, height: 260, background: 'var(--violet)' }}
        />
        <div
          className="halo"
          style={{ bottom: -80, left: -30, width: 240, height: 240, background: 'var(--blue)' }}
        />
        <div className="relative z-10">
          <span
            className="grid h-11 w-11 place-items-center rounded-2xl text-white"
            style={{ background: 'var(--grad)' }}
          >
            <Icon size={20} />
          </span>
          <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-white">{s.title}</h3>
          <p className="mt-2 max-w-[440px] text-[15px] leading-relaxed text-[var(--on-ink-muted)]">
            {s.text}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {s.chips?.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12.5px] font-medium text-white"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="group card relative h-full overflow-hidden p-8 pb-12 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative z-10">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--blue-soft)] text-[var(--blue)]">
          <Icon size={20} />
        </span>
        <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-[var(--text)]">
          {s.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.text}</p>
      </div>
      <SpectrumLine className="opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-28">
      <SectionHeader eyebrow="What I do" title="What I do *best.*" className="mb-12" />

      {/* Desktop bento */}
      <div className="hidden grid-cols-12 gap-5 min-[961px]:grid">
        <Reveal className="col-span-5">
          <ServiceCard index={0} />
        </Reveal>
        <Reveal className="col-span-7" delay={80}>
          <ServiceCard index={1} />
        </Reveal>
        <Reveal className="col-span-7" delay={120}>
          <ServiceCard index={2} />
        </Reveal>
        <Reveal className="col-span-5" delay={160}>
          <ServiceCard index={3} />
        </Reveal>
      </div>

      {/* Mobile / tablet portrait carousel */}
      <div className="min-[961px]:hidden">
        <Carousel slideClass="basis-[84%] sm:basis-[72%]">
          {services.map((_, i) => (
            <ServiceCard key={i} index={i} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}
