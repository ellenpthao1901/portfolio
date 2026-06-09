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
      className="
        fixed left-[2vw] top-1/2 -translate-y-1/2 z-40
        hidden lg:flex flex-col gap-7
        pointer-events-none
      "
      aria-label="Table of contents"
    >
      {items.map(item => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            aria-label={`Go to ${item.label}`}
            aria-current={isActive ? 'true' : undefined}
            className="
              group relative flex items-center justify-center
              p-0 m-0 bg-transparent border-0 cursor-pointer
              pointer-events-auto
            "
          >
            {/* White dot indicator — sits above the rotated label */}
            <span
              aria-hidden="true"
              className={`
                absolute -top-3 left-1/2 -translate-x-1/2
                w-[7px] h-[7px] rounded-full bg-[#ebebeb]
                transition-opacity duration-200
                ${isActive ? 'opacity-100' : 'opacity-0'}
              `}
            />
            <span
              className={`
                [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180
                text-[11px] tracking-[0.08em] uppercase
                transition-colors duration-200
                ${isActive
                  ? 'text-[#ebebeb] font-medium'
                  : 'text-[#888] font-normal group-hover:text-[#ebebeb]'}
              `}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
