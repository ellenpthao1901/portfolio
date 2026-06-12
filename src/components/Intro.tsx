import { useState } from 'react'
import LocalTime from './LocalTime'
import { ShadertoyWaterEffect } from './ShadertoyWaterEffect'

const IMAGE_URL = '/assets/black.png'

export default function Intro() {
  const [clicked, setClicked] = useState(false)

  return (
    <section
      className="intro"
      aria-label="Introduction"
      style={{ cursor: 'crosshair', position: 'relative', overflow: 'hidden' }}
      onClick={() => setClicked(true)}
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

      {/* Click hint — fades out after first interaction */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          pointerEvents: 'none',
          opacity: clicked ? 0 : 1,
          transition: 'opacity 600ms ease',
        }}
      >
        {/* Ripple icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="2" fill="rgba(255,255,255,0.5)" />
          <circle cx="7" cy="7" r="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
        <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          click to interact
        </span>
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
