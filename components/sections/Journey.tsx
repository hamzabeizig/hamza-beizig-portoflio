'use client'

import { useMemo, useState } from 'react'
import { experience, education, journeyKpis, countryFlags } from '@/data/profile'
import type { CountryCode } from '@/data/profile'
import { AccentHeading } from '@/components/kit/SectionHeading'
import Reveal from '@/components/kit/Reveal'
import Carousel from '@/components/kit/Carousel'

const AXIS_START = 2017
const AXIS_END = 2027

function toFrac(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return y + (m - 1) / 12
}
function nowFrac() {
  const d = new Date()
  return d.getFullYear() + d.getMonth() / 12
}
function pos(start: string, end: string | null) {
  const s = toFrac(start)
  const e = end ? toFrac(end) : nowFrac()
  const span = AXIS_END - AXIS_START
  const left = ((s - AXIS_START) / span) * 100
  const width = ((e - s) / span) * 100
  return { left, width }
}

type Item = (typeof experience)[number] | (typeof education)[number]

const timeline: Item[] = [...experience, ...education]

export default function Journey() {
  const [selected, setSelected] = useState('digcoder')
  const detail = experience.find((e) => e.id === selected) ?? experience[0]

  const nowLeft = useMemo(() => ((nowFrac() - AXIS_START) / (AXIS_END - AXIS_START)) * 100, [])
  const years = useMemo(
    () => Array.from({ length: AXIS_END - AXIS_START + 1 }, (_, i) => AXIS_START + i),
    [],
  )

  return (
    <section
      id="journey"
      className="on-ink relative isolate w-full overflow-hidden py-28 sm:py-40"
    >
      {/* Dark band + glow stop short of the edges and are clipped there, so neither the ink nor the
          blurred halo can leak a hairline past the waves on fractional-DPR screens */}
      <div aria-hidden className="absolute inset-x-0 inset-y-2 -z-10 overflow-hidden bg-[var(--ink)]">
        <div
          className="halo"
          style={{ top: -80, left: '20%', width: 380, height: 380, background: 'var(--blue)', opacity: 0.35 }}
        />
      </div>

      {/* Top wave: light page descending into the dark band */}
      <div className="pointer-events-none absolute inset-x-0 -top-[2px] z-[1] leading-[0]">
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="block h-[90px] w-full sm:h-[120px]">
          <path
            d="M0,0 L1440,0 L1440,72 C1230,20 1020,96 720,66 C420,36 240,96 0,64 Z"
            fill="var(--blue)"
            opacity="0.10"
          />
          <path
            d="M0,0 L1440,0 L1440,50 C1220,4 990,80 720,44 C460,10 260,74 0,42 Z"
            fill="var(--page)"
          />
        </svg>
      </div>

      {/* Bottom wave: dark band rising back into the light page */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-[2px] z-[1] leading-[0]">
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

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-10">
        <SectionHead />

        {/* KPIs */}
        <div className="mt-10 grid grid-cols-2 gap-4 min-[961px]:grid-cols-4">
          {journeyKpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="text-[26px] font-semibold tracking-tight text-white">{k.value}</div>
              <div className="mt-1 text-[13px] text-[var(--on-ink-muted)]">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Desktop Gantt + detail */}
        <div className="mt-12 hidden min-[961px]:block">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            {/* Header: year axis aligned with the timeline column */}
            <div className="grid grid-cols-[minmax(190px,230px)_1fr] gap-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--on-ink-dim)]">
                Role
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-1 justify-between font-mono text-[11px] text-[var(--on-ink-dim)]">
                  {years.filter((_, i) => i % 2 === 0).map((y) => (
                    <span key={y}>{y}</span>
                  ))}
                </div>
                <span className="w-[74px] flex-none" />
              </div>
            </div>

            {/* Lanes */}
            <div className="mt-4 space-y-6">
              {(
                [
                  { heading: 'Experience', items: experience, dot: 'var(--blue)' },
                  { heading: 'Education', items: education, dot: 'var(--mint)' },
                ] as const
              ).map((lane) => (
                <div key={lane.heading}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: lane.dot }} />
                    <span className="text-[12px] font-semibold text-white">{lane.heading}</span>
                  </div>

                  <div className="space-y-1.5">
                    {lane.items.map((it) => {
                      const isEdu = it.kind === 'education'
                      const isCurrent = 'current' in it && it.current
                      const clickable = !isEdu
                      const active = selected === it.id
                      const { left, width } = pos(it.start, it.end ?? null)
                      const label = isEdu
                        ? (it as typeof education[number]).school
                        : (it as typeof experience[number]).company
                      const role = isEdu
                        ? (it as typeof education[number]).degree
                        : (it as typeof experience[number]).title
                      const country = ('country' in it
                        ? it.country
                        : (it as typeof experience[number]).countries?.[0]) as CountryCode
                      const bar = isCurrent
                        ? 'var(--grad)'
                        : isEdu
                          ? 'rgba(34,197,139,0.9)'
                          : 'rgba(47,107,255,0.85)'
                      return (
                        <button
                          key={it.id}
                          onClick={() => clickable && setSelected(it.id)}
                          aria-label={label}
                          className={`grid w-full grid-cols-[minmax(190px,230px)_1fr] items-center gap-4 rounded-xl px-2 py-1.5 text-left transition-colors ${
                            clickable ? 'cursor-pointer hover:bg-white/[0.04]' : 'cursor-default'
                          } ${active ? 'bg-white/[0.06]' : ''}`}
                        >
                          {/* Info column — always readable */}
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white/10 text-[13px]">
                              {countryFlags[country]}
                            </span>
                            <div className="min-w-0">
                              <div className="truncate text-[13.5px] font-medium text-white">
                                {label}
                              </div>
                              <div className="truncate text-[11.5px] text-[var(--on-ink-muted)]">
                                {role}
                              </div>
                            </div>
                          </div>

                          {/* Timeline column */}
                          <div className="flex items-center gap-3">
                            <div
                              className="relative h-6 flex-1 overflow-hidden rounded-md"
                              style={{
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                backgroundImage:
                                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 20%)',
                              }}
                            >
                              <div
                                className="pointer-events-none absolute inset-y-0 w-px bg-[var(--violet)]/50"
                                style={{ left: `${nowLeft}%` }}
                              />
                              <div
                                className="absolute inset-y-[3px] rounded-[5px] transition-all"
                                style={{
                                  left: `${left}%`,
                                  width: `${Math.max(width, 2.5)}%`,
                                  background: bar,
                                  boxShadow: isCurrent
                                    ? '0 0 18px -4px rgba(124,92,255,0.8)'
                                    : active
                                      ? '0 0 0 1.5px rgba(255,255,255,0.6)'
                                      : 'none',
                                  opacity: !isEdu && !active && !isCurrent ? 0.85 : 1,
                                }}
                              />
                            </div>
                            <span className="w-[74px] flex-none text-right font-mono text-[11px] text-[var(--on-ink-dim)]">
                              {it.start.slice(0, 4)}–{it.end ? it.end.slice(0, 4) : 'now'}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail card */}
          <div key={detail.id} className="reveal in mt-6">
            <div className="card p-8 text-[var(--text)] transition-transform duration-300 hover:-translate-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-[24px] font-semibold tracking-tight">{detail.title}</h3>
                  <p className="mt-1 text-[15px] text-[var(--muted)]">
                    {detail.company} · {detail.location}
                  </p>
                </div>
                <p className="font-mono text-[12px] uppercase tracking-wider text-[var(--blue)]">
                  {detail.project}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {detail.bullets.map((b, i) => (
                  <div key={i} className="rounded-2xl border border-[var(--line)] bg-[var(--page)] p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--blue)]">
                      {detail.labels[i]}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-snug text-[var(--text)]">{b}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {detail.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--page)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet portrait carousel */}
        <div className="mt-10 min-[961px]:hidden">
          <Carousel tone="ink" slideClass="basis-[86%] sm:basis-[70%]">
            {timeline.map((it) => {
              const isEdu = it.kind === 'education'
              const { width } = pos(it.start, it.end ?? null)
              const label = isEdu
                ? (it as typeof education[number]).school
                : (it as typeof experience[number]).company
              const role = isEdu
                ? (it as typeof education[number]).degree
                : (it as typeof experience[number]).title
              const summary = isEdu
                ? (it as typeof education[number]).summary
                : (it as typeof experience[number]).project
              const country = ('country' in it
                ? it.country
                : (it as typeof experience[number]).countries?.[0]) as CountryCode
              return (
                <div
                  key={it.id}
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="text-[34px] font-semibold tracking-tight text-white">
                    {it.start.slice(0, 4)}
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(width * 3, 100)}%`,
                        background: isEdu ? 'var(--mint)' : 'var(--blue)',
                      }}
                    />
                  </div>
                  <p className="mt-4 text-[15px] font-medium text-white">{label}</p>
                  <p className="text-[13px] text-[var(--on-ink-muted)]">{role}</p>
                  <p className="mt-3 text-[13px] leading-snug text-[var(--on-ink-muted)]">{summary}</p>
                  <div className="mt-4 flex items-center gap-2 text-[12px] text-[var(--on-ink-dim)]">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
                      {countryFlags[country]}
                    </span>
                    {isEdu ? 'Education' : 'Experience'}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function SectionHead() {
  return (
    <Reveal>
      <p className="eyebrow mb-3 text-[var(--on-ink-dim)]">Journey</p>
      <AccentHeading text="A career across *four* countries." className="h2 text-white" />
    </Reveal>
  )
}
