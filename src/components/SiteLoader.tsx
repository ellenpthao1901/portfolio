import { useEffect, useState } from 'react'

const SITE_LOADER_STORAGE_KEY = 'portfolio-site-loader-seen'
const SITE_LOADER_DURATION = 2600
const SITE_LOADER_REPEAT_DELAY = 15 * 60 * 1000

function shouldShowSiteLoader() {
  try {
    const lastSeenAt = Number(window.localStorage.getItem(SITE_LOADER_STORAGE_KEY))
    if (!Number.isFinite(lastSeenAt)) return true

    return Date.now() - lastSeenAt > SITE_LOADER_REPEAT_DELAY
  } catch {
    return true
  }
}

function markSiteLoaderSeen() {
  try {
    window.localStorage.setItem(SITE_LOADER_STORAGE_KEY, String(Date.now()))
  } catch {
    // localStorage can be unavailable in private or restricted browsing modes.
  }
}

function LoaderOverlay({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    markSiteLoaderSeen()

    const startedAt = performance.now()
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startedAt
      setProgress(Math.min(100, Math.round((elapsed / SITE_LOADER_DURATION) * 100)))
    }, 40)

    const timeout = window.setTimeout(onDone, SITE_LOADER_DURATION)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [onDone])

  return (
    <div className="site-loader" role="status" aria-label="Loading portfolio">
      <div className="site-loader-inner">
        <div className="site-loader-topline">
          <span>Thao Nguyen</span>
          <span>{progress.toString().padStart(2, '0')}%</span>
        </div>
        <div className="site-loader-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="site-loader-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  )
}

export default function SiteLoader() {
  const [showLoader, setShowLoader] = useState(shouldShowSiteLoader)

  useEffect(() => {
    if (!showLoader) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [showLoader])

  return showLoader ? <LoaderOverlay onDone={() => setShowLoader(false)} /> : null
}
