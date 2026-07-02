import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const navRef = useRef<HTMLElement>(null)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    if (pathname !== '/viettel-digital') {
      setHighContrast(false)
      return
    }

    let frame: number | null = null

    const updateContrast = () => {
      frame = null
      const nav = navRef.current
      if (!nav) return

      const sampleY = nav.getBoundingClientRect().top + nav.getBoundingClientRect().height / 2
      const brightSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-contrast="high"]'))
      const shouldBoostContrast = brightSections.some(section => {
        const rect = section.getBoundingClientRect()
        return rect.top <= sampleY && rect.bottom >= sampleY
      })

      setHighContrast(current => (current === shouldBoostContrast ? current : shouldBoostContrast))
    }

    const scheduleUpdate = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateContrast)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [pathname])

  return (
    <header
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center"
      style={{ width: 'min(300px, calc(100vw - 48px))', height: '46px' }}
      aria-label="Primary navigation"
    >
      <nav
        ref={navRef}
        className={`site-nav${highContrast ? ' site-nav--high-contrast' : ''}`}
      >
        {isHome ? (
          <a href="#work" className="site-nav-link">Work</a>
        ) : (
          <Link to="/" className="site-nav-link">Work</Link>
        )}
        <a href="#play" className="site-nav-link">Play</a>
        <Link to="/about" className="site-nav-link">About</Link>
      </nav>
    </header>
  )
}
