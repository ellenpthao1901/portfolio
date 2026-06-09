import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fade in on mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('is-loaded'))
    })

    // Intercept internal link clicks for fade-out transition
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href) return
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (link.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      try {
        const url = new URL(link.href, window.location.href)
        if (url.origin !== window.location.origin) return
        if (url.pathname === window.location.pathname) return

        e.preventDefault()
        el.classList.remove('is-loaded')
        el.classList.add('is-leaving')
        setTimeout(() => navigate(url.pathname), 380)
      } catch {
        // malformed href — let browser handle it
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  return <div ref={ref} className="page-fade" />
}
