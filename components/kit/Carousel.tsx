'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode[]
  /** tailwind basis class per slide, e.g. "basis-[72%]" */
  slideClass?: string
  /** color scheme for controls */
  tone?: 'ink' | 'paper'
  className?: string
  arrows?: boolean
}

export default function Carousel({
  children,
  slideClass = 'basis-[84%] sm:basis-[72%]',
  tone = 'paper',
  className,
  arrows = true,
}: Props) {
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', dragFree: false, loop: false })
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(0)

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelected(embla.selectedScrollSnap())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    setCount(embla.scrollSnapList().length)
    onSelect()
    embla.on('select', onSelect)
    embla.on('reInit', onSelect)
  }, [embla, onSelect])

  const dotColor =
    tone === 'ink'
      ? { on: 'bg-white', off: 'bg-white/25' }
      : { on: 'bg-[var(--ink)]', off: 'bg-[var(--line)]' }
  const arrowCls =
    tone === 'ink'
      ? 'glass text-white'
      : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)]'

  return (
    <div className={className}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-1">
          {children.map((child, i) => (
            <div key={i} className={cn('min-w-0 shrink-0', slideClass)}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        {arrows && (
          <button
            aria-label="Previous"
            onClick={() => embla?.scrollPrev()}
            className={cn('flex h-10 w-10 items-center justify-center rounded-full', arrowCls)}
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <div className="flex items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === selected ? `w-5 ${dotColor.on}` : `w-2 ${dotColor.off}`,
              )}
            />
          ))}
        </div>
        {arrows && (
          <button
            aria-label="Next"
            onClick={() => embla?.scrollNext()}
            className={cn('flex h-10 w-10 items-center justify-center rounded-full', arrowCls)}
          >
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
