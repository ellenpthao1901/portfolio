import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocalTime from '../components/LocalTime'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

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
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeSrc, setActiveSrc] = useState<string | null>(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [defaultActive, setDefaultActive] = useState(true)

  // Show default video on mount
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
    <main
      className="flex flex-col min-h-screen"
      aria-label="Thao Nguyen portfolio homepage"
    >
      {/* Intro */}
      <section
        className="flex flex-col justify-end px-6 pt-24 pb-8 gap-6 border-b"
        style={{ borderColor: 'var(--color-line)' }}
        aria-label="Introduction"
      >
        <div className="flex flex-col gap-1">
          <h1
            className="text-4xl md:text-5xl font-medium tracking-tight"
            style={{ color: 'var(--color-white)' }}
          >
            Thao Nguyen
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-quiet)' }}>
            Local time — <LocalTime /> Seattle, WA.{' '}
            <span className="inline-flex items-center gap-1.5" aria-label="online">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#4ade80', animationName: 'live-ripple' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: '#4ade80' }}
                />
              </span>
            </span>
          </p>
        </div>
        <p className="max-w-xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          I designed alongside with data and crafted products that actually matters.
          Shipping live products at SAP and Viettel Digital.
        </p>
      </section>

      <Nav />

      {/* Work list */}
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
              className="text-base font-medium tracking-tight group-hover:opacity-100 transition-opacity"
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

      {/* Hover video preview */}
      <div
        ref={previewRef}
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

      <Footer />
    </main>
  )
}
