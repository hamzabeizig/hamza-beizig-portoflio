'use client'

import { useId } from 'react'

/**
 * Decorative curved "spectrum" line with a blue→violet gradient.
 * Sits at the bottom of a card (full-bleed) to add depth without clutter.
 * `vector-effect="non-scaling-stroke"` keeps the stroke crisp when stretched.
 */
export default function SpectrumLine({ className = '' }: { className?: string }) {
  const uid = useId()
  const stroke = `stroke-${uid}`
  const fill = `fill-${uid}`
  const glow = `glow-${uid}`

  return (
    <svg
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full ${className}`}
      viewBox="0 0 300 64"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={stroke} x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--blue)" stopOpacity="0" />
          <stop offset="0.25" stopColor="var(--blue)" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="var(--blue)" />
          <stop offset="1" stopColor="var(--violet)" />
        </linearGradient>
        <linearGradient id={fill} x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--blue)" stopOpacity="0.14" />
          <stop offset="1" stopColor="var(--blue)" stopOpacity="0" />
        </linearGradient>
        <filter id={glow} x="-20%" y="-60%" width="140%" height="240%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* soft area fill under the curve */}
      <path
        d="M0 44 C 46 44 58 14 98 20 S 152 50 196 34 S 256 6 300 26 L300 64 L0 64 Z"
        fill={`url(#${fill})`}
        vectorEffect="non-scaling-stroke"
      />
      {/* the spectrum curve */}
      <path
        d="M0 44 C 46 44 58 14 98 20 S 152 50 196 34 S 256 6 300 26"
        stroke={`url(#${stroke})`}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#${glow})`}
      />
    </svg>
  )
}
