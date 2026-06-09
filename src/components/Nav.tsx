import { Link, useLocation } from 'react-router-dom'

interface NavProps {
  theme?: 'dark' | 'light'
}

export default function Nav({ theme = 'dark' }: NavProps) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-6"
      style={{
        backdropFilter: 'blur(12px) saturate(160%)',
        WebkitBackdropFilter: 'blur(12px) saturate(160%)',
      }}
      aria-label="Primary navigation"
    >
      <nav
        className="flex gap-6 text-sm font-medium tracking-tight"
        style={{ color: theme === 'light' ? 'var(--color-bg)' : 'var(--color-text)' }}
      >
        {isHome ? (
          <a
            href="#work"
            className="opacity-100 hover:opacity-60 transition-opacity"
          >
            Work
          </a>
        ) : (
          <Link to="/" className="hover:opacity-60 transition-opacity">Work</Link>
        )}
        <Link
          to="/about"
          className={`hover:opacity-60 transition-opacity ${pathname === '/about' ? 'opacity-100' : 'opacity-60'}`}
        >
          About
        </Link>
      </nav>
    </header>
  )
}
