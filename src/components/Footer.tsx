export default function Footer() {
  return (
    <footer
      className="flex flex-col items-center gap-3 py-12 px-6 text-sm border-t"
      style={{ borderColor: 'var(--color-line)', color: 'var(--color-quiet)' }}
    >
      <p>Let's write up the next story through designs!</p>
      <nav className="flex gap-3 items-center" aria-label="Contact links">
        <a href="mailto:hello@example.com" className="hover:opacity-60 transition-opacity">Gmail</a>
        <span style={{ color: 'var(--color-dim)' }}>·</span>
        <a href="#" className="hover:opacity-60 transition-opacity">LinkedIn</a>
        <span style={{ color: 'var(--color-dim)' }}>·</span>
        <a href="#" className="hover:opacity-60 transition-opacity">Resume</a>
      </nav>
    </footer>
  )
}
