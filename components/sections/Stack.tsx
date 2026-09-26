'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { stack, familyMeta, softSkills } from '@/data/profile'
import type { Family } from '@/data/profile'
import { SectionHeader } from '@/components/kit/SectionHeading'
import { cn } from '@/lib/utils'

const filters: { key: 'all' | Family; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI & LLMs' },
  { key: 'lang', label: 'Languages' },
  { key: 'front', label: 'Front-end' },
  { key: 'back', label: 'Back-end' },
  { key: 'data', label: 'Databases' },
  { key: 'tools', label: 'Workflow' },
  { key: 'design', label: 'Design & CMS' },
]

export default function Stack() {
  const [filter, setFilter] = useState<'all' | Family>('all')

  return (
    <section id="stack" className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-28">
      <SectionHeader eyebrow="Toolbox" title="The periodic table of *my stack.*" className="mb-8" />

      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-full border px-4 py-2 text-[13px] font-medium transition-all',
                active
                  ? 'border-transparent bg-[var(--ink)] text-white'
                  : 'border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:border-[var(--dim)]',
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <motion.div layout className="periodic-grid">
        {/* Intro gradient tile (spans 2) */}
        <motion.div
          layout
          whileHover={{ y: -6 }}
          className="periodic-hero col-span-2 flex flex-col justify-between rounded-2xl p-4 text-white"
          style={{ background: 'var(--grad)' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/80">Stack</span>
          <p className="text-[15px] font-semibold leading-tight">
            38 tools · 7 families — full-stack with an AI edge
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {stack.map(([sym, name, fam], i) => {
            const show = filter === 'all' || filter === fam
            if (!show) return null
            const meta = familyMeta[fam]
            const isAi = fam === 'ai'
            return (
              <motion.div
                layout
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  'relative flex aspect-square flex-col justify-between rounded-2xl border p-3',
                  isAi
                    ? 'border-white/10 bg-[var(--ink2)] text-white'
                    : 'border-[var(--line)] bg-[var(--paper)]',
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-lg text-[12px] font-semibold text-white"
                    style={{ background: isAi ? 'var(--grad)' : meta.color }}
                    aria-hidden
                  >
                    {sym}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[10px]',
                      isAi ? 'text-white/40' : 'text-[var(--dim)]',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <p
                    className={cn(
                      'text-[14px] font-semibold leading-tight tracking-tight',
                      isAi ? 'text-white' : 'text-[var(--text)]',
                    )}
                  >
                    {name}
                  </p>
                  <p
                    className="mt-0.5 font-mono text-[9.5px] uppercase tracking-wider"
                    style={{ color: meta.color }}
                  >
                    {meta.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Soft skills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {softSkills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 py-2 text-[13px] font-medium text-[var(--muted)]"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}
