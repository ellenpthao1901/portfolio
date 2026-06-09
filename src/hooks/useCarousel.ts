import { useState, useRef, useCallback } from 'react'

export function useCarousel(total: number) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [exiting, setExiting] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback((next: number, dir?: 'next' | 'prev') => {
    if (next === index || total === 0) return
    const d = dir ?? (next > index ? 'next' : 'prev')
    if (timer.current) clearTimeout(timer.current)
    setDirection(d)
    setExiting(true)
    timer.current = setTimeout(() => {
      setIndex(next)
      setExiting(false)
    }, 40) // just enough to trigger exit class, actual transition in CSS
  }, [index, total])

  const prev = useCallback(() => { if (index > 0) go(index - 1, 'prev') }, [index, go])
  const next = useCallback(() => { if (index < total - 1) go(index + 1, 'next') }, [index, total, go])

  return { index, direction, exiting, go, prev, next }
}
