import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WORK_ITEMS = [
  {
    title: 'SAP',
    subtitle: 'SaaS Analytics Dashboard',
    meta: '2025 • Internship',
    href: '/sap',
    preview: '/assets/sap-hover.gif',
    isDefault: true,
  },
  {
    title: 'Viettel Digital',
    subtitle: 'B2C Car Renting Mobile App',
    meta: '2024 • Internship',
    href: '/viettel-digital',
    preview: '/assets/viettel-digital-hover.mov',
  },
  {
    title: 'AI to transform any documents into personalized podcasts',
    subtitle: null,
    meta: '2025 • Project',
    href: '/pods',
    preview: null,
  },
  {
    title: 'Instagram',
    subtitle: 'Event Discovery',
    meta: '2026 • Project',
    href: '#',
    preview: null,
  },
  {
    title: 'Kitsap Transit',
    subtitle: 'Mix-method Research',
    meta: '2026 • Capstone',
    href: '/kitsap',
    preview: null,
  },
]

const defaultItem = WORK_ITEMS.find(i => i.isDefault && i.preview)

export default function Home() {
  const [activeSrc, setActiveSrc] = useState<string | null>(defaultItem?.preview ?? null)
  const [visible, setVisible] = useState(!!defaultItem?.preview)

  useEffect(() => {
    if (defaultItem?.preview) {
      setActiveSrc(defaultItem.preview)
      setVisible(true)
    }
  }, [])

  const handleEnter = (preview: string | null) => {
    if (preview) {
      setActiveSrc(preview)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const handleLeave = () => {
    if (defaultItem?.preview) {
      setActiveSrc(defaultItem.preview)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  return (
    <>
      <section className="flex flex-col flex-1" id="work" aria-label="Selected work">
        {WORK_ITEMS.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className="group flex items-center justify-between px-6 py-5 border-b transition-colors hover:bg-white/[0.02]"
            style={{ borderColor: 'var(--color-line)' }}
            onPointerEnter={() => handleEnter(item.preview)}
            onPointerLeave={handleLeave}
            onFocus={() => handleEnter(item.preview)}
            onBlur={handleLeave}
          >
            <span className="text-base font-medium tracking-tight" style={{ color: 'var(--color-white)' }}>
              {item.subtitle ? (
                <>
                  {item.title}
                  <span style={{ color: 'var(--color-dim)' }}> | </span>
                  {item.subtitle}
                </>
              ) : item.title}
            </span>
            <span className="text-sm shrink-0 ml-4" style={{ color: 'var(--color-quiet)' }}>
              {item.meta}
            </span>
          </Link>
        ))}
      </section>

      {/* Hover preview */}
      <div
        className="fixed right-8 top-1/2 -translate-y-1/2 w-72 rounded-lg overflow-hidden pointer-events-none z-30 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        {activeSrc && (
          activeSrc.endsWith('.mov') || activeSrc.endsWith('.mp4') ? (
            <video
              key={activeSrc}
              src={activeSrc}
              className="w-full h-full object-cover"
              muted loop playsInline autoPlay
            />
          ) : (
            <img src={activeSrc} alt="" className="w-full h-full object-cover" />
          )
        )}
      </div>
    </>
  )
}
