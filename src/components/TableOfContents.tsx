import { useEffect, useState } from 'react'

export interface TocItem {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)

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
      setActive(current ?? items[0]?.id ?? null)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [items])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col"
      aria-label="Table of contents"
    >
      {items.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group flex items-center gap-0 border-t border-b -mb-px text-left bg-transparent border-0 cursor-pointer p-0"
            style={{ borderColor: '#2a2a2a' }}
            aria-label={`Go to ${item.label}`}
          >
            {/* Active indicator bar */}
            <div
              className="w-[2px] self-stretch transition-colors duration-200"
              style={{ background: isActive ? '#ebebeb' : 'transparent' }}
            />
            {/* Label */}
            <span
              className="py-3 px-3 text-[10px] font-medium tracking-[0.12em] uppercase transition-colors duration-200"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                color: isActive ? '#ebebeb' : '#444444',
                fontWeight: isActive ? '600' : '400',
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
