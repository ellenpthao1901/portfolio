import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = items
      .map(i => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[]

    const update = () => {
      const mid = window.innerHeight / 2
      let current: string | null = null
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= mid) current = s.id
      }
      setActive(current)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [items])

  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 hidden lg:flex"
      aria-label="Table of contents"
    >
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-xs tracking-widest uppercase transition-opacity"
          style={{
            color: 'var(--color-quiet)',
            opacity: active === item.id ? 1 : 0.4,
            writingMode: 'vertical-rl',
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
