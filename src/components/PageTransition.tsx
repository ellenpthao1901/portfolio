import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PageTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.remove('is-loaded', 'is-pre-leaving', 'is-leaving')
    el.classList.add('is-entering')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('is-loaded'))
    })
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    const el = ref.current
    if (!el) return

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
        const target = `${url.pathname}${url.search}${url.hash}`
        const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
        if (target === current) return

        e.preventDefault()
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        el.classList.remove('is-loaded', 'is-entering', 'is-leaving')
        el.classList.add('is-pre-leaving')
        void el.offsetHeight
        requestAnimationFrame(() => {
          el.classList.remove('is-pre-leaving')
          el.classList.add('is-leaving')
        })

        timeoutRef.current = setTimeout(() => {
          navigate(target)
        }, 360)
      } catch {
        // Let the browser handle malformed href values.
      }
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [navigate])

  return <div ref={ref} className="page-fade" />
}
