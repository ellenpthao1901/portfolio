import { useState } from 'react'
import LocalTime from './LocalTime'
import { ShadertoyWaterEffect } from './ShadertoyWaterEffect'
import { useContactForm } from '../hooks/useContactForm'

const IMAGE_URL = '/assets/black.png'

function ContactModal({ onClose }: { onClose: () => void }) {
  const { fields, status, setField, submit } = useContactForm()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    submit('home')
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 flex flex-col gap-5"
        style={{
          background: 'linear-gradient(180deg, #1a1a1a 0%, #141414 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {status === 'sent' ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <p className="text-[#d8d8d8] text-[18px] tracking-tight">Message sent!</p>
            <p className="text-[#7b7b7b] text-[14px]">I'll get back to you soon.</p>
            <button onClick={onClose} className="mt-4 text-[13px] text-[#4e4e4e] hover:text-[#7b7b7b] transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#d8d8d8] text-[16px] tracking-tight font-medium">Let's get in touch</p>
                <p className="text-[#4e4e4e] text-[13px] mt-1">Drop me a message and I'll get back to you.</p>
              </div>
              <button onClick={onClose} className="text-[#4e4e4e] hover:text-[#7b7b7b] transition-colors mt-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your name"
                required
                disabled={status === 'sending'}
                value={fields.name}
                onChange={e => setField('name', e.target.value)}
                className="bg-[#111] text-[#d8d8d8] text-[14px] px-4 py-3 rounded-xl border border-[#252525] outline-none focus:border-[#4e4e4e] transition-colors placeholder:text-[#4e4e4e] disabled:opacity-50"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                disabled={status === 'sending'}
                value={fields.email}
                onChange={e => setField('email', e.target.value)}
                className="bg-[#111] text-[#d8d8d8] text-[14px] px-4 py-3 rounded-xl border border-[#252525] outline-none focus:border-[#4e4e4e] transition-colors placeholder:text-[#4e4e4e] disabled:opacity-50"
              />
              <textarea
                placeholder="What's on your mind?"
                required
                rows={4}
                disabled={status === 'sending'}
                value={fields.message}
                onChange={e => setField('message', e.target.value)}
                className="bg-[#111] text-[#d8d8d8] text-[14px] px-4 py-3 rounded-xl border border-[#252525] outline-none focus:border-[#4e4e4e] transition-colors placeholder:text-[#4e4e4e] resize-none disabled:opacity-50"
              />
              {status === 'error' && (
                <p className="text-red-400 text-[12px]">Something went wrong, try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-1 py-3 rounded-xl text-[14px] font-medium transition-colors disabled:opacity-50"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#d8d8d8' }}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function ContactPill() {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={e => { e.stopPropagation(); setOpen(true) }}
        className="inline-flex items-center gap-2 text-[13px] cursor-pointer"
        style={{
          color: 'rgba(134,239,172,0.9)',
          pointerEvents: 'auto',
          background: 'none',
          border: 'none',
          padding: 0,
          lineHeight: 'inherit',
        }}
      >
        <span
          className="w-[7px] h-[7px] rounded-full flex-shrink-0"
          style={{ background: 'rgba(134,239,172,0.9)', boxShadow: '0 0 6px rgba(134,239,172,0.6)' }}
        />
        <span style={{ display: 'inline-block', width: '11ch', textAlign: 'left' }}>
          {hovered ? "Let's get in touch" : 'Working on something cool?'}
        </span>
      </button>
      {open && <ContactModal onClose={() => setOpen(false)} />}
    </>
  )
}

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
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="2" fill="rgba(255,255,255,0.5)" />
          <circle cx="7" cy="7" r="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
        <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          click to interact
        </span>
      </div>

      <div className="identity" style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ pointerEvents: 'none' }}>Thao Nguyen</h1>
        <p style={{ pointerEvents: 'none' }}>
          Local time — <LocalTime /> Seattle, WA.{' '}
          <span style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ContactPill />{' '}
            <span className="live-dot" aria-label="online" />
          </span>
        </p>
      </div>
      <p className="statement" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        I designed alongside with data and crafted products that actually matters.
        Shipping live products at SAP and Viettel Digital.
      </p>
    </section>
  )
}
