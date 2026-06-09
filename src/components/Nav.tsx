import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const navRef = useRef<HTMLElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const nav = navRef.current
    if (!nav) return
    const rect = nav.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    nav.style.setProperty('--mx', `${x}px`)
    nav.style.setProperty('--my', `${y}px`)
  }

  const onMouseLeave = () => {
    const nav = navRef.current
    if (!nav) return
    nav.style.setProperty('--mx', `-999px`)
    nav.style.setProperty('--my', `-999px`)
  }

  return (
    <header
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center"
      style={{ width: 'min(300px, calc(100vw - 48px))', height: '46px' }}
      aria-label="Primary navigation"
    >
      <nav
        ref={navRef}
        className="site-nav"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
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
