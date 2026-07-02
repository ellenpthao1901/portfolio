import { useState } from 'react'
import { Link } from 'react-router-dom'

type WorkItem = {
  title: string
  subtitle: string | null
  meta: string
  href: string
  preview: string | null
  description?: string
  tags?: string[]
  statusBadge?: string
}

const WORK_ITEMS: WorkItem[] = [
  {
    title: 'SAP',
    subtitle: 'AI for SaaS Analytics Dashboard',
    meta: '2025 • Internship',
    href: '/sap',
    preview: '/assets/sap-hover.mp4',
    description:
      'Designed AI experiences across multiple CMMS/EAM products.',
    tags: ['B2B SaaS', 'AI Workflows', 'Data Dashboard', 'Commerce UX'],
  },
  {
    title: 'Viettel Digital',
    subtitle: 'B2C Car Renting Mobile App',
    meta: '2024 • Internship',
    href: '/viettel-digital',
    preview: '/assets/vietteldigital-cover1.mp4',
    description:
      'Designed a 0-1 car-rental experiences for the top 1 fintech app in Vietnam, serving nearly 20M users and 1000+ ecosystem partners.',
    tags: ['0-1 Design', 'Car Booking Flow', 'Payment Flow', 'Fintech Super App'],
  },
  {
    title: 'AI to transform any documents into personalized podcasts',
    subtitle: null,
    meta: '2025 • Project',
    href: '/pods',
    preview: '/assets/pods-cover.webp',
    description:
      'Benchmarked with Google NotebookLM to make podcasts more personalized.',
    tags: ['EdTech', 'Learning Through Conversation', 'Flashcard Generated'],
  },
  {
    title: 'Instagram',
    subtitle: 'Event Discovery',
    meta: '2026 • Project',
    href: '#',
    preview: null,
    statusBadge: 'CURRENTLY BUILDING',
  },
  {
    title: 'Kitsap Transit',
    subtitle: 'Mix-method Research',
    meta: '2026 • Capstone',
    href: '/kitsap',
    preview: '/assets/kitsapcover.webp',
    description:
      'Raise awareness of the federal mobile-supported program.',
    tags: ['1-1 Interview', 'Data Synthesize', 'A/B Testing', 'Usability Testing'],
  },
]

export default function Home() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  const handleEnter = (item: WorkItem, index: number) => {
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
    setActiveSrc(null)
    setActiveIndex(null)
    setVisible(false)
  }

  const isVideo = activeSrc
    ? /\.(mov|mp4|webm)$/i.test(activeSrc)
    : false

  return (
    <main className="home" aria-label="Thao Nguyen portfolio homepage">
      <div className="work-band">
        <section className="work-list" id="work" aria-label="Selected work">
          {WORK_ITEMS.map((item, i) => {
            const isActive = activeIndex === i
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
                <span className="work-row-main">
                  <span className="work-title-line">
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

                    {isActive && item.statusBadge ? (
                      <span className="work-status-badge">{item.statusBadge}</span>
                    ) : null}
                  </span>

                  {isActive && item.description && item.tags?.length ? (
                    <span className="work-details">
                      <span className="work-description">{item.description}</span>
                      <span className="work-tags" aria-label={`${item.title} topics`}>
                        {item.tags.map((tag) => (
                          <span key={tag} className="work-tag">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                  ) : null}
                </span>

                <span className="work-row-right">
                  {!(isActive && item.statusBadge) ? (
                    <>
                      <span className="work-active-dot" aria-hidden="true" />
                      <span className="work-meta">{item.meta}</span>
                    </>
                  ) : null}
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
                preload="metadata"
              />
            ) : (
              <img src={activeSrc} alt="" className="work-hover-media" />
            ))}
        </div>
      </div>
    </main>
  )
}
