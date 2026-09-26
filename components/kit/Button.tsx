'use client'

import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'white' | 'ink' | 'outline'

interface Props {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: Variant
  bubble?: boolean
  icon?: 'up-right' | 'right'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'white',
  bubble = true,
  icon = 'up-right',
  className,
  type = 'button',
  disabled,
  ariaLabel,
}: Props) {
  const cls = cn('btn', `btn-${variant}`, className)
  const Icon = icon === 'right' ? ArrowRight : ArrowUpRight
  const inner = (
    <>
      <span>{children}</span>
      {bubble && (
        <span className="bubble" aria-hidden>
          <Icon size={15} strokeWidth={2.25} />
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}
