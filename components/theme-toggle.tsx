'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center transition-colors shadow-lg opacity-0">
        <Sun className="w-5 h-5 text-accent" />
      </button>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center hover:bg-white/90 dark:hover:bg-black/90 hover:scale-105 transition-all shadow-lg"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-5 h-5 text-accent" />
      ) : (
        <Moon className="w-5 h-5 text-accent" />
      )}
    </button>
  )
}
