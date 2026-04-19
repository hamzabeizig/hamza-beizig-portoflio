'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailingCursorRef = useRef<HTMLDivElement>(null)
  
  const [isVisible, setIsVisible] = useState(false)
  
  const mouse = useRef({ x: -100, y: -100 })
  const trailing = useRef({ x: -100, y: -100 })

  useEffect(() => {
    let animationFrameId: number
    
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      mouse.current = { x: e.clientX, y: e.clientY }
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }
    
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Interactive elements hover logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea')) {
        if (trailingCursorRef.current) {
          trailingCursorRef.current.style.width = '3rem'
          trailingCursorRef.current.style.height = '3rem'
          trailingCursorRef.current.style.marginLeft = '-1.5rem'
          trailingCursorRef.current.style.marginTop = '-1.5rem'
          trailingCursorRef.current.style.backgroundColor = 'rgba(var(--accent), 0.1)'
        }
      }
    }

    const handleMouseOut = () => {
      if (trailingCursorRef.current) {
        trailingCursorRef.current.style.width = '2rem'
        trailingCursorRef.current.style.height = '2rem'
        trailingCursorRef.current.style.marginLeft = '-1rem'
        trailingCursorRef.current.style.marginTop = '-1rem'
        trailingCursorRef.current.style.backgroundColor = 'transparent'
      }
    }

    const animate = () => {
      trailing.current.x += (mouse.current.x - trailing.current.x) * 0.15
      trailing.current.y += (mouse.current.y - trailing.current.y) * 0.15
      
      if (trailingCursorRef.current) {
        trailingCursorRef.current.style.transform = `translate3d(${trailing.current.x}px, ${trailing.current.y}px, 0)`
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-accent rounded-full pointer-events-none z-[9999]"
      />
      <div 
        ref={trailingCursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border-2 border-accent rounded-full pointer-events-none z-[9998]"
        style={{
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, margin-left 0.2s, margin-top 0.2s',
        }}
      />
    </>
  )
}
