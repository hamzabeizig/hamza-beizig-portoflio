'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/profile'
import { SectionHeader } from '@/components/kit/SectionHeading'
import Reveal from '@/components/kit/Reveal'
import Carousel from '@/components/kit/Carousel'
import { cn } from '@/lib/utils'

function WorkCard({
  index,
  featured = false,
  aspect,
}: {
  index: number
  featured?: boolean
  aspect?: string
}) {
  const p = projects[index]
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative block h-full w-full overflow-hidden rounded-[26px] border border-[var(--line)]',
        aspect,
      )}
    >
      <Image
        src={p.image}
        alt={p.title}
        fill
        sizes="(max-width: 960px) 90vw, 50vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

      {/* top pills */}
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="glass rounded-full px-3 py-1 text-[11.5px] font-medium text-white">
            {p.type}
          </span>
          <span className="glass rounded-full px-3 py-1 text-[11.5px] font-medium text-white">
            Responsive
          </span>
        </div>
        <span className="font-mono text-[11px] text-white/70">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      {/* bottom */}
      <div className="absolute inset-x-5 bottom-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-[20px] font-semibold tracking-tight text-white">{p.title}</h3>
            {featured && (
              <p className="mt-1 max-w-[440px] text-[13.5px] leading-snug text-white/75">
                {p.description}
              </p>
            )}
          </div>
          <span className="glass-arrow bg-white text-[var(--ink)] transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </a>
  )
}

export default function Work() {
  return (
    <section id="work" className="mx-auto w-full max-w-[1200px] px-6 pb-16 pt-8 sm:pb-28 sm:pt-10">
      <SectionHeader eyebrow="Portfolio" title="Selected *work.*" className="mb-12" />

      {/* Desktop bento */}
      <div className="hidden auto-rows-[280px] grid-cols-12 gap-5 min-[961px]:grid">
        <Reveal className="col-span-7 row-span-2">
          <WorkCard index={0} featured />
        </Reveal>
        <Reveal className="col-span-5" delay={80}>
          <WorkCard index={1} />
        </Reveal>
        <Reveal className="col-span-5" delay={120}>
          <WorkCard index={2} />
        </Reveal>
        <Reveal className="col-span-4" delay={160}>
          <WorkCard index={3} />
        </Reveal>
        <Reveal className="col-span-4" delay={200}>
          <WorkCard index={4} />
        </Reveal>
        <Reveal className="col-span-4" delay={240}>
          <WorkCard index={5} />
        </Reveal>
      </div>

      {/* Mobile / tablet portrait carousel */}
      <div className="min-[961px]:hidden">
        <Carousel slideClass="basis-[84%] sm:basis-[70%]">
          {projects.map((_, i) => (
            <WorkCard key={i} index={i} featured={i === 0} aspect="aspect-[4/5]" />
          ))}
        </Carousel>
      </div>
    </section>
  )
}
