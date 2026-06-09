import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    if (!dot) return

    const onMove = (e: PointerEvent) => {
      dot.style.opacity = '1'
      dot.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`
    }
    const onLeave = () => { dot.style.opacity = '0' }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div className="cursor-dot" aria-hidden="true" />
}
