'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  originX: number
  originY: number
  color: string
  swing?: number
  swingSpeed?: number
  swingOffset?: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const isLight = resolvedTheme === 'light'
    const color = isLight ? '150, 160, 180' : '255, 255, 255'

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      // More particles for snow, fewer for stars
      const density = isLight ? 6000 : 9000
      const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / density), isLight ? 200 : 150)
      
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height

        if (isLight) {
          // Snow parameters
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            radius: Math.random() * 2 + 1, // Larger snow
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 0.8 + 0.2, // Falling down
            swing: Math.random() * 2,
            swingSpeed: Math.random() * 0.02 + 0.01,
            swingOffset: Math.random() * Math.PI * 2,
            color,
          })
        } else {
          // Star parameters
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            radius: Math.random() * 2 + 1, // Bigger stars
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            color,
          })
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now()

      // Draw and update particles
      particles.forEach((p) => {
        if (isLight) {
          // Snow motion
          p.x += p.vx + Math.sin(time * p.swingSpeed! + p.swingOffset!) * 0.5
          p.y += p.vy

          // Snow wrap around
          if (p.y > canvas.height) {
            p.y = 0
            p.x = Math.random() * canvas.width
          }
          if (p.x > canvas.width) p.x = 0
          if (p.x < 0) p.x = canvas.width

          // Draw snow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          // Make snow slate-blue/gray in light mode so it's fully visible against a white background
          ctx.fillStyle = `rgba(148, 163, 184, ${Math.random() * 0.4 + 0.3})`
          ctx.fill()
          
          // Snow doesn't draw lines
        } else {
          // Star motion
          p.x += p.vx
          p.y += p.vy

          // Star wrap around
          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          if (p.y > canvas.height) p.y = 0

          // Mouse interaction for stars
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Draw star
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          // Brighter stars
          ctx.fillStyle = `rgba(${p.color}, ${distance < 200 ? 1 : 0.6})`
          ctx.fill()

          // Draw line to mouse
          if (distance < 200) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
            ctx.strokeStyle = `rgba(${p.color}, ${0.4 - distance / 200 * 0.4})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }

          // Draw lines between particles
          particles.forEach((p2) => {
            const dx2 = p.x - p2.x
            const dy2 = p.y - p2.y
            const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

            if (distance2 < 120) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              // Brighter lines
              ctx.strokeStyle = `rgba(${p.color}, ${0.25 - distance2 / 120 * 0.25})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          })
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme, mounted]) // Re-run when theme changes

  if (!mounted) {
    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-0" />
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${resolvedTheme === 'light' ? 'opacity-100' : 'opacity-80'}`}
    />
  )
}
