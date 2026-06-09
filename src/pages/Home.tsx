import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WORK_ITEMS = [
  {
    title: 'SAP',
    subtitle: 'SaaS Analytics Dashboard',
    meta: '2025 • Internship',
    href: '/sap',
    video: '/assets/sap-hover.mov',
    isDefault: true,
  },
  {
    title: 'Viettel Digital',
    subtitle: 'B2C Car Renting Mobile App',
    meta: '2024 • Internship',
    href: '/viettel-digital',
    video: '/assets/viettel-digital-hover.mov',
  },
  {
    title: 'AI to transform any documents into personalized podcasts',
    subtitle: null,
    meta: '2025 • Project',
    href: '/pods',
  },
  {
    title: 'Instagram',
    subtitle: 'Event Discovery',
    meta: '2026 • Project',
    href: '#',
  },
  {
    title: 'Kitsap Transit',
    subtitle: 'Mix-method Research',
    meta: '2026 • Capstone',
    href: '/kitsap',
  },
]

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeSrc, setActiveSrc] = useState<string | null>(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [defaultActive, setDefaultActive] = useState(true)

  useEffect(() => {
    const defaultItem = WORK_ITEMS.find(i => i.isDefault && i.video)
    if (defaultItem?.video) {
      setActiveSrc(defaultItem.video)
      setPreviewVisible(true)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !activeSrc) return
    if (video.src !== window.location.origin + activeSrc) {
      video.src = activeSrc
    }
    if (previewVisible) video.play().catch(() => {})
    else video.pause()
  }, [activeSrc, previewVisible])

  const handleEnter = (video?: string) => {
    if (video) {
      setDefaultActive(false)
      setActiveSrc(video)
      setPreviewVisible(true)
    }
  }

  const handleLeave = () => {
    const defaultItem = WORK_ITEMS.find(i => i.isDefault && i.video)
    if (defaultActive && defaultItem?.video) {
      setActiveSrc(defaultItem.video)
      setPreviewVisible(true)
    } else {
      setPreviewVisible(false)
    }
  }

  return (
    <>
      <section
        className="flex flex-col flex-1"
        id="work"
        aria-label="Selected work"
      >
        {WORK_ITEMS.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className="group flex items-center justify-between px-6 py-5 border-b transition-colors hover:bg-white/[0.02]"
            style={{ borderColor: 'var(--color-line)' }}
            onPointerEnter={() => handleEnter(item.video)}
            onPointerLeave={handleLeave}
            onFocus={() => handleEnter(item.video)}
            onBlur={handleLeave}
          >
            <span
              className="text-base font-medium tracking-tight"
              style={{ color: 'var(--color-white)' }}
            >
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

      <div
        className="fixed right-8 top-1/2 -translate-y-1/2 w-72 aspect-video rounded-lg overflow-hidden pointer-events-none z-30 transition-opacity duration-300"
        style={{ opacity: previewVisible ? 1 : 0 }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />
      </div>
    </>
  )
}
