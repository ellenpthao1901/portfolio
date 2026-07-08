import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'
  const navRef = useRef<HTMLElement>(null)
  const [highContrast, setHighContrast] = useState(false)

  const workActive = pathname !== '/about' && !(isHome && hash === '#play')
  const playActive = isHome && hash === '#play'
  const aboutActive = pathname === '/about'

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

      const navRect = nav.getBoundingClientRect()
      const sampleY = navRect.top + navRect.height / 2
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
        <Link
          to={{ pathname: '/', hash: '#work' }}
          className={`site-nav-link${workActive ? ' is-active' : ''}`}
        >
          Work
        </Link>
        <Link
          to={{ pathname: '/', hash: '#play' }}
          className={`site-nav-link${playActive ? ' is-active' : ''}`}
        >
          Play
        </Link>
        <Link to="/about" className={`site-nav-link${aboutActive ? ' is-active' : ''}`}>
          About
        </Link>
      </nav>
    </header>
  )
}
