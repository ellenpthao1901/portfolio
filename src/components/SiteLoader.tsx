import { useEffect, useState, type CSSProperties } from 'react'
import LoaderRipple from './LoaderRipple'

const SITE_LOADER_TEXT_DURATION = 1200
const SITE_LOADER_REVEAL_DURATION = 4000
const SITE_LOADER_TOTAL_DURATION = SITE_LOADER_TEXT_DURATION * 2 + SITE_LOADER_REVEAL_DURATION
const LOADER_RIPPLE_STYLE = {
  '--site-loader-reveal-duration': `${SITE_LOADER_REVEAL_DURATION}ms`,
} as CSSProperties

function LoaderOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'DESIGNING...' | 'SHIPPED!'>('DESIGNING...')
  const [isRevealing, setIsRevealing] = useState(false)

  useEffect(() => {
    const phaseTimeout = window.setTimeout(() => setPhase('SHIPPED!'), SITE_LOADER_TEXT_DURATION)
    const revealTimeout = window.setTimeout(() => setIsRevealing(true), SITE_LOADER_TEXT_DURATION * 2)
    const timeout = window.setTimeout(onDone, SITE_LOADER_TOTAL_DURATION)

    return () => {
      window.clearTimeout(phaseTimeout)
      window.clearTimeout(revealTimeout)
      window.clearTimeout(timeout)
    }
  }, [onDone])

  useEffect(() => {
    document.body.classList.toggle('site-loader-revealing', isRevealing)

    return () => {
      document.body.classList.remove('site-loader-revealing')
    }
  }, [isRevealing])

  return (
    <div
      className={`site-loader${isRevealing ? ' site-loader--revealing' : ''}`}
      role="status"
      aria-label="Loading portfolio"
      style={LOADER_RIPPLE_STYLE}
    >
      <div className="site-loader-curtain" aria-hidden="true" />
      {!isRevealing && (
        <span key={phase} className="site-loader-text" data-text={phase} aria-live="polite">
          {phase}
        </span>
      )}
      {isRevealing && (
        <LoaderRipple active={isRevealing} durationMs={SITE_LOADER_REVEAL_DURATION} />
      )}
    </div>
  )
}

export default function SiteLoader() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (!showLoader) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('site-loader-active')

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.classList.remove('site-loader-active', 'site-loader-revealing')
    }
  }, [showLoader])

  return showLoader ? <LoaderOverlay onDone={() => setShowLoader(false)} /> : null
}
