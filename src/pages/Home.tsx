import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type WorkItem = {
  title: string
  subtitle: string | null
  meta: string
  href: string
  preview: string | null
  isDefault?: boolean
}

const WORK_ITEMS: WorkItem[] = [
  {
    title: 'SAP',
    subtitle: 'SaaS Analytics Dashboard',
    meta: '2025 • Internship',
    href: '/sap',
    preview: '/assets/sap-hover.webm',
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

const defaultItem = WORK_ITEMS.find(i => i.isDefault && i.preview) ?? null

export default function Home() {
  const [activeSrc, setActiveSrc] = useState<string | null>(defaultItem?.preview ?? null)
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultItem ? WORK_ITEMS.indexOf(defaultItem) : null,
  )
  const [visible, setVisible] = useState(!!defaultItem?.preview)
  // tracks whether we are currently showing the default (auto) state vs. a user-driven hover
  const [defaultActive, setDefaultActive] = useState(!!defaultItem?.preview)

  useEffect(() => {
    if (defaultItem?.preview) {
      setActiveSrc(defaultItem.preview)
      setActiveIndex(WORK_ITEMS.indexOf(defaultItem))
      setVisible(true)
      setDefaultActive(true)
    }
  }, [])

  const handleEnter = (item: WorkItem, index: number) => {
    if (item !== defaultItem) setDefaultActive(false)
    if (item.preview) {
      setActiveSrc(item.preview)
      setActiveIndex(index)
      setVisible(true)
    } else {
      // hovered row has no preview — clear active state entirely
      setActiveIndex(index)
      setVisible(false)
    }
  }

  const handleLeave = () => {
    if (defaultItem?.preview) {
      setActiveSrc(defaultItem.preview)
      setActiveIndex(WORK_ITEMS.indexOf(defaultItem))
      setVisible(true)
      setDefaultActive(true)
    } else {
      setActiveIndex(null)
      setVisible(false)
    }
  }

  const isVideo = activeSrc
    ? /\.(mov|mp4|webm)$/i.test(activeSrc)
    : false

  return (
    <main className="home" aria-label="Thao Nguyen portfolio homepage">
      <div className="work-band">
        <section className="work-list" id="work" aria-label="Selected work">
          {WORK_ITEMS.map((item, i) => {
            const isActive = activeIndex === i && (defaultActive ? item === defaultItem : true)
            return (
              <Link
                key={i}
                to={item.href}
                className={`work-row${isActive ? ' is-active' : ''}`}
                onPointerEnter={() => handleEnter(item, i)}
                onPointerLeave={handleLeave}
                onFocus={() => handleEnter(item, i)}
                onBlur={handleLeave}
              >
                <span className="work-title">
                  {item.subtitle ? (
                    <>
                      {item.title}
                      <span className="title-divider"> | </span>
                      {item.subtitle}
                    </>
                  ) : (
                    item.title
                  )}
                </span>
                <span className="work-row-right">
                  <span className="work-active-dot" aria-hidden="true" />
                  <span className="work-meta">{item.meta}</span>
                </span>
              </Link>
            )
          })}
        </section>

        {/* Right-side hover preview, sized to match work-list height */}
        <div
          className={`work-hover-preview${visible ? ' is-active' : ''}`}
          aria-hidden="true"
        >
          {activeSrc &&
            (isVideo ? (
              <video
                key={activeSrc}
                src={activeSrc}
                className="work-hover-media"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <img src={activeSrc} alt="" className="work-hover-media" />
            ))}
        </div>
      </div>
    </main>
  )
}
