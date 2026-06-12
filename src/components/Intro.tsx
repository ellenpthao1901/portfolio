import LocalTime from './LocalTime'
import { ShadertoyWaterEffect } from './ShadertoyWaterEffect'

// Empty string — ShadertoyWaterEffect uses its own dark #1a1a1a placeholder
const IMAGE_URL = '/assets/black.png'

export default function Intro() {
  return (
    <section
      className="intro"
      aria-label="Introduction"
      style={{ cursor: 'default', position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
      >
        <ShadertoyWaterEffect
          imageUrl={IMAGE_URL}
          waveSpeed={1.0}
          springStrength={0.005}
          velocityDamping={0.002}
          pressureDamping={0.999}
          distortionStrength={0.2}
          rippleSize={20.0}
          rippleStrength={1.0}
          chromaticAberrationStrength={0.0}
          chromaticAberrationDispersal={0.005}
        />
      </div>

      <div className="identity" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        <h1>Thao Nguyen</h1>
        <p>
          Local time — <LocalTime /> Seattle, WA.{' '}
          <span className="live-dot" aria-label="online" />
        </p>
      </div>
      <p className="statement" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        I designed alongside with data and crafted products that actually matters.
        Shipping live products at SAP and Viettel Digital.
      </p>
    </section>
  )
}
