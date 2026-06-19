import { useEffect, useState } from 'react'

const SITE_LOADER_DURATION = 3200
const SITE_LOADER_PHASE_DURATION = 1200

function LoaderOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'COOKING...' | 'DESIGNING...'>('COOKING...')

  useEffect(() => {
    const phaseTimeout = window.setTimeout(() => setPhase('DESIGNING...'), SITE_LOADER_PHASE_DURATION)
    const timeout = window.setTimeout(onDone, SITE_LOADER_DURATION)

    return () => {
      window.clearTimeout(phaseTimeout)
      window.clearTimeout(timeout)
    }
  }, [onDone])

  return (
    <div className="site-loader" role="status" aria-label="Loading portfolio">
      <span key={phase} className="site-loader-text" data-text={phase} aria-live="polite">
        {phase}
      </span>
    </div>
  )
}

export default function SiteLoader() {
  const [showLoader, setShowLoader] = useState(true)

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
