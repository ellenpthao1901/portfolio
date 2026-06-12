import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import TableOfContents from '../../components/TableOfContents'

const TOC = [
  { id: 'section-discovery', label: 'Discovery' },
  { id: 'section-ideate', label: 'Ideate' },
  { id: 'section-define', label: 'Define' },
  { id: 'section-design', label: 'Design' },
  { id: 'section-validate', label: 'Validate' },
]

// ─── tokens ──────────────────────────────────────────────────────────────────
const ink = '#ebebeb'
const muted = '#888888'
const meta = '#999999'
const line = '#2a2a2a'
const soft = '#1a1a1a'
const bg = '#141414'

// ─── carousel hook ────────────────────────────────────────────────────────────
function useCarousel(total: number) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<'next' | 'prev'>('next')
  const [exiting, setExiting] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback((next: number, d: 'next' | 'prev') => {
    if (next === index) return
    if (timer.current) clearTimeout(timer.current)
    setDir(d)
    setExiting(true)
    timer.current = setTimeout(() => { setIndex(next); setExiting(false) }, 560)
  }, [index])

  const prev = () => { if (index > 0) go(index - 1, 'prev') }
  const next = () => { if (index < total - 1) go(index + 1, 'next') }
  return { index, dir, exiting, go, prev, next }
}

// ─── shared helpers ───────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] tracking-[0.04em] uppercase leading-4 m-0 pt-[6px]" style={{ color: meta }}>{children}</p>
}

function Split({ id, number, title, body }: { id?: string; number: string; title: string; body: string }) {
  return (
    <section id={id} className="grid gap-[clamp(32px,7vw,96px)] py-[112px] px-[5vw] border-b"
      style={{ gridTemplateColumns: '0.9fr 1fr', borderColor: line }}>
      <div>
        <p className="text-[13px] tracking-[0.06em] uppercase mb-[14px] m-0" style={{ color: ink }}>{number}</p>
        <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] m-0" style={{ color: ink }}>{title}</h2>
      </div>
      <p className="self-end max-w-[720px] text-base leading-[1.72] m-0" style={{ color: muted }}>{body}</p>
    </section>
  )
}

function NextArrow() {
  return (
    <svg viewBox="0 0 56 14" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="2" y1="7" x2="50" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="42,2 52,7 42,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 48 16" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="2" y1="8" x2="42" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <polyline points="34,2 44,8 34,14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── persona data ─────────────────────────────────────────────────────────────
const PERSONAS = [
  { src: '/assets/pods/persona-lily.webp', alt: 'Lily Ng — passionate PhD student persona', caption: 'Lily Ng — The passionate PhD Student, would like to minimize time in reading articles and doing her research' },
  { src: '/assets/pods/persona-edward.webp', alt: 'Edward White — tenure CS professor persona', caption: 'Edward White — That One Tenure CS Professor, likes to keep up with all the new breakthroughs' },
]

export default function Pods() {
  const persona = useCarousel(PERSONAS.length)

  return (
    <>
      <TableOfContents items={TOC} />

      {/* Project intro */}
      <section className="grid border-b py-[60px] px-[10%]"
        style={{ minHeight: 238, gridTemplateColumns: 'minmax(320px,52.7vw) 1fr', alignItems: 'center', borderColor: line, background: bg }}>
        <div>
          <p className="text-[20.6px] leading-[30px] tracking-[-0.44px] m-0" style={{ color: ink }}>A platform that converts different sources into audio-based podcasts</p>
          <p className="text-[20.6px] leading-[30px] tracking-[-0.44px] m-0" style={{ color: muted }}>Pods • AI Product • 2024</p>
        </div>
      </section>

      {/* Cover image */}
      <section className="overflow-hidden border-b" style={{ background: bg, borderColor: line }}>
        <img src="/assets/pods/cover.webp" alt="Pods platform cover" className="block object-cover" style={{ width: '102%', margin: '-1% -1% -2%' }} />
      </section>

      {/* Details */}
      <section className="grid gap-10 py-[70px] px-[10%] pb-20 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Details</Label>
        <div className="border-t" style={{ borderColor: line }}>
          {[
            { label: 'YEAR', value: 'October — December 2024' },
            { label: 'TEAM', value: 'Thomas Emnetu\nYaphet Paulos\nKelly Chang\nCaleb Lee' },
            { label: 'ROLE', value: 'UX Designer' },
            { label: 'TOOLS', value: 'Figma\nMiro' },
          ].map(r => (
            <div key={r.label} className="grid py-5 border-b last:border-b-0" style={{ gridTemplateColumns: '190px 1fr', gap: 48, borderColor: line }}>
              <p className="text-[11px] tracking-[0.04em] uppercase leading-5 m-0" style={{ color: meta }}>{r.label}</p>
              <p className="text-[14px] leading-5 tracking-[-0.28px] m-0 whitespace-pre-line" style={{ color: ink }}>{r.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>The Problem (from the POV as a college student)</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Learners are overwhelmed with text-heavy materials that are hard to process on the go or during multitasking.</span>
        </p>
      </section>

      {/* Preview */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Preview</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Let's take a sneak peek into the 3 designs of Pods</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>Our team goal is providing users a seamless experience in managing materials systematically, helping them save time and boost productivity.</p>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-7 mt-4" style={{ gridTemplateRows: '1fr auto' }}>
          {[
            { src: '/assets/pods/preview-1.webp', caption: 'Recent Space: Managing audio file into each category' },
            { src: '/assets/pods/preview-2.webp', caption: 'Engaging with AI-generated flashcards while waiting for the podcast to be generated' },
            { src: '/assets/pods/preview-3.webp', caption: 'Enhancing personalization though audio customization' },
          ].map(item => (
            <div key={item.src} className="grid gap-7" style={{ gridRow: 'span 2', gridTemplateRows: 'subgrid' }}>
              <img src={item.src} alt={item.caption} className="w-full block rounded-[20px] self-center" style={{ background: bg }} />
              <p className="text-[clamp(14px,1.05vw,17px)] leading-[1.35] tracking-[-0.32px] text-center m-0" style={{ color: ink }}>{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 01 Discovery */}
      <Split id="section-discovery" number="01. DISCOVERY" title="Understand who is struggling and why"
        body="My team started this project from our own struggle as college students — drowning in dense readings I couldn't keep up with on the go. Through research, we realized there were many more people out there facing the same challenge." />

      {/* Survey */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Survey</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Surveyed 50 students to validate the problem</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>We sent out a Google Form to 50 college, master's, and PhD students to gather data on their study difficulties and the platform features they wished existed.</p>
        </div>
        <img className="col-span-2 block mx-auto rounded-[12px]" style={{ width: '61%', maxWidth: 880, marginTop: 56, background: bg }} src="/assets/pods/line-chart.webp" alt="Survey data line chart" />
        {/* Survey bottom */}
        <div className="col-span-2 grid items-center mt-14 mx-auto" style={{ gridTemplateColumns: 'minmax(160px,220px) 1fr', gridTemplateRows: '1fr auto', gap: 'clamp(24px,3vw,48px)', width: '61%', maxWidth: 880 }}>
          {/* Pie */}
          <div className="grid justify-items-center gap-5" style={{ gridRow: 'span 2', gridTemplateRows: 'subgrid' }}>
            <div className="relative rounded-full" style={{ width: 'clamp(176px,17.6vw,256px)', aspectRatio: '1/1', background: 'conic-gradient(from 0deg,#e8b4f0 0% 84%,#b8c8f8 84% 100%)' }}>
              <span className="absolute flex flex-col items-center gap-[2px] text-center z-10" style={{ top: '62%', left: '52%', transform: 'translate(-50%,-50%)' }}>
                <span className="text-[14px] font-medium tracking-[-0.36px]" style={{ color: '#2a2050' }}>84.0%</span>
                <span className="text-[18px] font-medium tracking-[-0.44px]" style={{ color: '#2a2050' }}>Yes</span>
              </span>
              <span className="absolute flex flex-col items-center gap-[2px] text-center z-10" style={{ top: '22%', left: '30%', transform: 'translate(-50%,-50%)' }}>
                <span className="text-[11px] font-medium" style={{ color: '#2a2050' }}>16.0%</span>
                <span className="text-[12px] font-medium" style={{ color: '#2a2050' }}>No</span>
              </span>
            </div>
            <p className="text-[clamp(14px,1.05vw,17px)] leading-[1.35] tracking-[-0.32px] text-center m-0 max-w-[480px]" style={{ color: ink }}>Are you seeking a more effective learning way to increase your productivity?</p>
          </div>
          {/* Diamonds */}
          <div className="grid gap-8" style={{ gridRow: 'span 2', gridTemplateRows: 'subgrid' }}>
            <div className="grid justify-center gap-[clamp(32px,4vw,56px)]" style={{ gridTemplateColumns: 'repeat(3,minmax(96px,140px))' }}>
              {['Organize all materials in one place', 'Summarize materials into key points', 'Offer features that let users explore and learn materials'].map(text => (
                <div key={text} className="relative flex items-center justify-center w-full rounded-[14px]" style={{ aspectRatio: '1/1', padding: '16% 14%', textAlign: 'center', background: 'linear-gradient(135deg,#e8b4f0 0%,#b8c8f8 50%,#d0e8ff 100%)', border: '1px solid rgba(255,255,255,0.25)', transform: 'rotate(45deg)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                  <span className="inline-block text-[clamp(11px,0.88vw,14px)] font-medium leading-[1.35] tracking-[-0.32px]" style={{ transform: 'rotate(-45deg)', color: '#2a2050', maxWidth: '11ch' }}>{text}</span>
                </div>
              ))}
            </div>
            <p className="text-[clamp(14px,1.05vw,17px)] leading-[1.35] tracking-[-0.32px] text-center m-0 max-w-[720px] mx-auto" style={{ color: ink }}>Top three features users want to see in the new app</p>
          </div>
        </div>
      </section>

      {/* User personas */}
      <section className="grid gap-10 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>User Personas</Label>
        <div className="self-start">
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Two behavioral personas representing busy learners</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>From the survey insights, I built two behavioral personas — busy individuals with heavy reading loads, struggling with text-heavy materials and seeking to process dense texts efficiently while multitasking.</p>
        </div>
        <div className="col-span-2 relative overflow-hidden" style={{ minHeight: 'clamp(420px,56vh,640px)', display: 'grid', alignItems: 'center' }}>
          {PERSONAS.map((p, i) => {
            const isActive = i === persona.index
            const isExiting = persona.exiting && i === persona.index
            const tx = persona.dir === 'prev' ? '-34px' : '34px'
            return (
              <div key={i} className="flex flex-col items-center justify-center gap-6 px-16 pb-[52px]" style={{ gridArea: '1 / 1', position: i === 0 ? 'relative' : 'absolute', inset: 0, opacity: isExiting ? 0 : isActive ? 1 : 0, transform: isExiting ? `translateX(${persona.dir === 'prev' ? '34px' : '-34px'}) scale(0.985)` : isActive ? 'translateX(0) scale(1)' : `translateX(${tx}) scale(0.985)`, transition: 'opacity 560ms ease, transform 560ms cubic-bezier(0.22,1,0.36,1)', visibility: isActive || isExiting ? 'visible' : 'hidden', pointerEvents: isActive ? 'auto' : 'none' }}>
                <img src={p.src} alt={p.alt} className="block w-full rounded-[12px]" style={{ maxWidth: 1100, background: soft }} />
                <p className="text-base leading-[26px] tracking-[-0.32px] text-center m-0 max-w-[820px]" style={{ color: muted }}>{p.caption}</p>
              </div>
            )
          })}
          <button onClick={persona.prev} disabled={persona.index === 0} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 grid place-items-center rounded-full border-0 cursor-pointer p-0 transition-opacity" style={{ background: 'rgba(38,38,38,0.85)', opacity: persona.index === 0 ? 0 : 1, pointerEvents: persona.index === 0 ? 'none' : 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" style={{ color: 'rgba(255,255,255,0.85)' }}><path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={persona.next} disabled={persona.index === PERSONAS.length - 1} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 grid place-items-center rounded-full border-0 cursor-pointer p-0 transition-opacity" style={{ background: 'rgba(38,38,38,0.85)', opacity: persona.index === PERSONAS.length - 1 ? 0 : 1, pointerEvents: persona.index === PERSONAS.length - 1 ? 'none' : 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" style={{ color: 'rgba(255,255,255,0.85)' }}><path d="M9 5 L16 12 L9 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-2 z-10">
            {PERSONAS.map((_, i) => (
              <button key={i} onClick={() => persona.go(i, i < persona.index ? 'prev' : 'next')} className="w-2 h-2 rounded-full border-0 cursor-pointer p-0 transition-colors" style={{ background: i === persona.index ? ink : 'rgba(235,235,235,0.28)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* 02 Ideate */}
      <Split id="section-ideate" number="02. IDEATE" title="Brainstorm broadly, then narrow with intent"
        body="The core issue surfaced clearly: the lack of customization to user needs, such as personalized audio summaries. From there, I brainstormed twelve actionable directions before narrowing them down." />

      {/* Ideation */}
      <section className="grid items-start gap-10 py-[72px] px-[10%] pb-6" style={{ gridTemplateColumns: '1fr 1fr', background: bg }}>
        <Label>Ideation</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Considering between 12 ideas WAS a challenge!</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>Some outstanding ideas that our team has coming up with such as converting articles into comic-based formats or game-based learning with puzzle games.</p>
        </div>
        <img className="col-span-2 block w-full mx-auto mt-14 rounded-[12px]" style={{ maxWidth: 1100, background: soft }} src="/assets/pods/brainstorming.webp" alt="Brainstorming twelve actionable solutions" />
      </section>

      {/* Secondary research */}
      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Secondary Research</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Sound can help people retain information, connect words with facts or visualizations, and be a simple and effective way to obtain and retain information.</span>{' '}— Elocanc, 2021
        </p>
      </section>

      {/* Our solution */}
      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Our Solution</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Creating a platform that helps users convert different sources into audio-based podcasts.</span>
        </p>
      </section>

      {/* 03 Define */}
      <Split id="section-define" number="03. DEFINE" title="Finding the unique selling points"
        body="There's an existing platform Google NotebookLM that has the same mission with ours so our team has conducted competitive analysis and found out aspects that we could improve." />

      {/* Competitive analysis */}
      <section className="grid items-start gap-10 pt-24 pb-[120px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Competitive Analysis</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Some aspects that we find NotebookLM falls short.</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>NotebookLM is an AI tool developed by Google to help users generate audio files and interact with them by uploading their documents. NotebookLM also does quite of the same thing with our intended goal but there are some features that I find they are lacking of.</p>
        </div>
        <div className="col-span-2 relative grid place-items-center mt-20 py-[60px] mx-auto w-full" style={{ maxWidth: 1100, color: 'rgba(206,178,235,0.85)' }}>
          <span className="absolute flex flex-col items-start gap-1 z-10" style={{ top: '4%', left: 0, width: 'clamp(180px,18vw,240px)' }}>
            <span className="text-[clamp(14px,1.05vw,17px)] font-semibold leading-[1.35] tracking-[-0.32px]" style={{ color: ink }}>Lack of Customization to user needs, such as personalized audio summaries</span>
            <img src="/assets/pods/arrow-tl.webp" alt="" className="block self-end" style={{ width: 'clamp(110px,12vw,170px)', marginTop: 12, marginRight: -90 }} aria-hidden="true" />
          </span>
          <span className="absolute flex flex-col items-end text-right gap-1 z-10" style={{ top: '4%', right: 0, width: 'clamp(180px,18vw,240px)' }}>
            <span className="text-[clamp(14px,1.05vw,17px)] font-semibold leading-[1.35] tracking-[-0.32px]" style={{ color: ink }}>Limited flexibility in adapting to diverse learning styles</span>
            <img src="/assets/pods/arrow-br.webp" alt="" className="block self-start" style={{ width: 'clamp(80px,8.5vw,120px)', marginTop: 12, marginLeft: -36 }} aria-hidden="true" />
          </span>
          <img src="/assets/pods/notebooklm-card.webp" alt="NotebookLM card" className="block rounded-[16px]" style={{ width: '62%', maxWidth: 620 }} />
          <span className="absolute flex flex-col items-end text-right gap-1 z-10" style={{ bottom: '4%', right: 0, width: 'clamp(280px,26vw,360px)' }}>
            <img src="/assets/pods/arrow-loop-br.webp" alt="" className="block self-start order-first" style={{ width: 'clamp(110px,12vw,170px)', marginBottom: 12, marginLeft: -36 }} aria-hidden="true" />
            <span className="text-[clamp(14px,1.05vw,17px)] font-semibold leading-[1.35] tracking-[-0.32px]" style={{ color: ink }}>No seamless integration for creating user-specific content formats</span>
          </span>
        </div>
      </section>

      {/* USP */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Unique Selling Points</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>So… What makes our product stand out?</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>The product is designed to give users complete control over your audio experience from fine-tuning preferences before generating a podcast to adjusting the tone, length, and even the number of hosts.</p>
        </div>
        <div className="col-span-2 grid items-stretch mt-14 mx-auto" style={{ gridTemplateColumns: '1fr auto 1fr', gap: 8, maxWidth: 1000, width: '85%' }}>
          <div className="flex flex-col gap-3 self-start pt-10">
            <h3 className="text-[clamp(14px,1.05vw,17px)] font-semibold leading-[1.35] m-0" style={{ color: ink }}>Input's Personalization</h3>
            <ul className="m-0 pl-5 flex flex-col gap-3">
              {['Enhanced control', 'Users can refine preferences before generating the podcast'].map(t => (
                <li key={t} className="text-[clamp(14px,1.05vw,17px)] font-semibold leading-[1.35]" style={{ color: ink }}>{t}</li>
              ))}
            </ul>
          </div>
          <img src="/assets/pods/usp-vertical.webp" alt="Unique selling points visual" className="block justify-self-center" style={{ maxWidth: 440, background: 'transparent' }} />
          <div className="flex flex-col gap-3 self-end pb-10">
            <h3 className="text-[clamp(14px,1.05vw,17px)] font-semibold leading-[1.35] m-0" style={{ color: ink }}>Customization Features</h3>
            <ul className="m-0 pl-5 flex flex-col gap-3">
              {['Edit the length of audio summaries', 'Adjust the tone (formal/conversational)', 'Choose the number of hosts'].map(t => (
                <li key={t} className="text-[clamp(14px,1.05vw,17px)] font-semibold leading-[1.35]" style={{ color: ink }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Our Vision</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Empowering users to create podcasts that truly feel their own</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>With this comprehensive vision, we expect to see this platform make the reading experience more accessible and easier for everyone.</p>
        </div>
        <div className="col-span-2 grid grid-cols-3 mt-14" style={{ gap: 'clamp(32px,4vw,56px)' }}>
          {[
            { src: '/assets/pods/icon-personalization.webp', title: 'Personalization', body: 'Empowers users to customize content to match their unique needs such as fine tuning/ audio length/ accents' },
            { src: '/assets/pods/icon-accessibility.webp', title: 'Accessibility', body: 'Learners can easily consume educational content while on the go, making knowledge is available to everyone' },
            { src: '/assets/pods/icon-ai.webp', title: 'AI-powered', body: 'Enhances learning efficiency with AI-powered audio summaries and flashcards' },
          ].map(c => (
            <div key={c.title} className="flex flex-col items-center text-center gap-[18px]">
              <img src={c.src} alt={c.title} className="object-contain" style={{ width: 168, height: 168, background: 'transparent', borderRadius: 0 }} />
              <h3 className="text-[clamp(18px,1.6vw,24px)] font-bold tracking-[-0.44px] leading-[1.2] m-0" style={{ color: ink }}>{c.title}</h3>
              <p className="text-[15px] leading-[1.65] tracking-[-0.28px] m-0" style={{ color: muted }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 Design */}
      <Split id="section-design" number="04. DESIGN" title="Design an intuitive content-to-audio experience"
        body="The vision: a platform where every user can engage with content in a way that feels intuitive and efficient — AI-powered audio summaries and flashcards built around accessibility for everyone." />

      {/* User flow */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>User Flow</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>A simplified 4-step user flow</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>I distilled the experience into four essential steps: upload sources, prompt the AI with additional context, fine-tune preferences, and generate.</p>
        </div>
        <img className="col-span-2 block w-full mt-14 rounded-[12px]" style={{ background: bg }} src="/assets/pods/user-flow.webp" alt="Simplified 4-step user flow diagram" />
      </section>

      {/* IA */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Information Architecture</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Three main sections, designed for flow</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>The main navigation lives across "Create a podcast," "Recent Pods," and "Spaces." Users can upload up to 50 different types of sources simultaneously.</p>
        </div>
        <img className="col-span-2 block w-full mt-14 rounded-[12px]" style={{ background: bg }} src="/assets/pods/information-architecture.webp" alt="Information architecture diagram" />
      </section>

      {/* Core screens */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Core Screens</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Four core screens shape the product</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            <strong style={{ color: ink }}>Home Dashboard</strong> — an organized overview with pinned and recent items.<br /><br />
            <strong style={{ color: ink }}>Create a New Pod</strong> — input any source and get real-time recommendations.<br /><br />
            <strong style={{ color: ink }}>Customization</strong> — granular inputs before generating.<br /><br />
            <strong style={{ color: ink }}>Latency Page</strong> — AI progress with contextual flashcards while waiting.
          </p>
        </div>
        <div className="col-span-2 grid mt-14" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(24px,3vw,40px)' }}>
          {[
            { src: '/assets/pods/pod-creation-lofi.webp', caption: 'Pod creation — low fidelity' },
            { src: '/assets/pods/pod-creation-v1.webp', caption: 'Pod creation — v.1' },
            { src: '/assets/pods/customization-lofi.webp', caption: 'Customization — low fidelity' },
            { src: '/assets/pods/customization-v1.webp', caption: 'Customization — v.1' },
            { src: '/assets/pods/latency-iter3.webp', caption: 'Latency page — iteration 3' },
            { src: '/assets/pods/design-detail-1.webp', caption: 'Design system reference' },
          ].map(fig => (
            <figure key={fig.src} className="m-0 grid gap-4">
              <img src={fig.src} alt={fig.caption} className="w-full block rounded-[12px]" style={{ background: soft }} />
              <figcaption className="text-[14px] tracking-[-0.28px] leading-5" style={{ color: muted }}>{fig.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 05 Validate */}
      <Split id="section-validate" number="05. VALIDATE" title="Cognitive walkthrough and design improvements"
        body="I ran in-person and remote testing sessions over Zoom with Washington students. Two key feedback themes emerged that shaped the next iteration." />

      {/* Feedback cards */}
      <div className="grid grid-cols-2 gap-6 pb-24 mx-auto" style={{ width: '69%', maxWidth: 990 }}>
        {[
          { label: '— Feedback 1', title: 'Streak system felt stressful, not motivating', body: '"I feel like I\'d get really stressed out if I had to study every single day just to keep the streak going." Users shared they wouldn\'t engage with the streak feature, so I removed it entirely.' },
          { label: '— Feedback 2', title: 'Customization felt too dense', body: '"The space for the fine-tuning option feels quite small, making it hard for me to click on each one." I refined the back button, reduced fine-tuning to the 2 most used features, and added breathing room.' },
        ].map(c => (
          <article key={c.label} className="p-7 border rounded-[24px]" style={{ borderColor: line, background: soft }}>
            <p className="text-[13px] tracking-[0.06em] uppercase mb-[14px] m-0" style={{ color: ink }}>{c.label}</p>
            <h3 className="text-[24px] font-bold mb-3" style={{ color: ink }}>{c.title}</h3>
            <p className="text-base leading-[1.72] m-0" style={{ color: muted }}>{c.body}</p>
          </article>
        ))}
      </div>

      {/* Iteration intro */}
      <section className="grid gap-10 py-[72px] px-[10%]" style={{ gridTemplateColumns: '1fr 1fr', background: bg }}>
        <Label>Iteration</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Refined design decisions based on feedback</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] mb-5" style={{ color: muted }}>Synthesizing user feedback and observed behaviors, I iterated on the initial designs to help users move through the flow with less friction.</p>
          <ul className="m-0 pl-5 flex flex-col gap-2">
            {['Initial logo changed to match the overall theme', 'Limited the homepage navigation to 3 clear sections', '"Recent Pods" refined to contain only generated podcasts', 'Added a 3-step progress bar for process tracking', 'Showed captions side-by-side with generated podcasts'].map(t => (
              <li key={t} className="text-[20.6px] leading-8 tracking-[-0.44px]" style={{ color: muted }}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Iteration comparisons */}
      <section className="relative grid gap-[clamp(40px,6vw,80px)] pb-[120px] mx-auto"
        style={{ gridTemplateColumns: '1fr 1fr', width: '75%', maxWidth: 1250 }}>
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-px" style={{ width: '100vw', background: line }} />
        {[
          { before: { src: '/assets/pods/homepage-v1.webp', alt: 'Homepage v1' }, after: { src: '/assets/pods/homepage-v2.webp', alt: 'Homepage v2' }, caption: 'Limited the homepage navigation to 3 clear sections and refined "Recent Pods"' },
          { before: { src: '/assets/pods/customization-v1.webp', alt: 'Customization v1' }, after: { src: '/assets/pods/customization-v2.webp', alt: 'Customization v2' }, caption: 'Reduced fine-tuning to the 2 most used features and added breathing room for clickability' },
        ].map((pair, i) => (
          <figure key={i} className="m-0 flex flex-col gap-4">
            <div className="grid items-center gap-[clamp(16px,2.5vw,32px)]" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
              <img src={pair.before.src} alt={pair.before.alt} className="w-full block rounded-[24px] object-contain p-4 shadow-[0_8px_32px_rgba(0,0,0,0.38)]" style={{ background: soft }} />
              <span className="flex items-center justify-center text-white" style={{ width: 'clamp(36px,4vw,56px)', height: 'clamp(12px,1.4vw,18px)' }}><ArrowRight /></span>
              <img src={pair.after.src} alt={pair.after.alt} className="w-full block rounded-[24px] object-contain p-4 shadow-[0_8px_32px_rgba(0,0,0,0.38)]" style={{ background: soft }} />
            </div>
            <figcaption className="text-base leading-[26px] tracking-[-0.32px] text-center mx-auto max-w-[720px]" style={{ color: muted }}>{pair.caption}</figcaption>
          </figure>
        ))}
      </section>

      {/* Final galleries */}
      {[
        { label: 'DASHBOARD & HOMEPAGE', images: [{ src: '/assets/pods/dashboard.webp', alt: 'Dashboard' }, { src: '/assets/pods/desktop-1.webp', alt: 'Desktop home' }] },
        { label: 'CREATE A PODCAST', images: [{ src: '/assets/pods/create-podcast-final.webp', alt: 'Create podcast final' }, { src: '/assets/pods/create-podcast-alt.webp', alt: 'Create podcast alt' }, { src: '/assets/pods/create-podcast.webp', alt: 'Create podcast' }] },
        { label: 'CUSTOMIZATION & LATENCY', images: [{ src: '/assets/pods/latency-v2.webp', alt: 'Latency v2' }, { src: '/assets/pods/latency-iter4.webp', alt: 'Latency iter4' }, { src: '/assets/pods/latency-iter3b.webp', alt: 'Latency iter3' }] },
        { label: 'LISTEN TO PODCAST', images: [{ src: '/assets/pods/listen-transcript-final.webp', alt: 'Listen final' }, { src: '/assets/pods/listen-transcript-1.webp', alt: 'Listen 1' }, { src: '/assets/pods/listen-transcript-2.webp', alt: 'Listen 2' }] },
        { label: 'TIMELINE', images: [{ src: '/assets/pods/timeline-v2.webp', alt: 'Timeline v2' }, { src: '/assets/pods/timeline-v2-1.webp', alt: 'Timeline v2-1' }] },
      ].map(gallery => (
        <section key={gallery.label} className="py-24 px-[5vw] border-b" style={{ borderColor: line, background: bg }}>
          <p className="text-[13px] tracking-[0.06em] uppercase text-center m-0" style={{ color: ink }}>{gallery.label}</p>
          <div className="grid mt-[42px] mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(24px,3vw,40px)', width: '90%', maxWidth: 1500 }}>
            {gallery.images.map(img => (
              <img key={img.src} src={img.src} alt={img.alt} className="w-full block rounded-[14px]" style={{ background: soft }} />
            ))}
          </div>
        </section>
      ))}

      {/* Takeaways */}
      <section className="py-24 px-[5vw] border-b" style={{ borderColor: line }}>
        <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] mb-6" style={{ color: ink }}>Key takeaways</h2>
        <p className="text-base leading-[1.72] mb-7" style={{ color: muted }}>Pods sharpened my product instincts in three key ways:</p>
        <div className="grid grid-cols-3 gap-6 pt-9">
          {[
            { n: '1.', title: 'Not always more is better', body: 'I initially offered many customization features to help users tailor podcasts. Too many options overwhelmed users, making choices harder and the design less user-friendly.' },
            { n: '2.', title: 'Adapt to necessary changes', body: "Across two design versions and valuable user testing insights, adapting to necessary changes made the final designs more inclusive and accessible — better matching users' needs." },
            { n: '3.', title: 'Align goals throughout the process', body: 'Keeping the goal of boosting user customization in mind helped maintain focus and develop features that genuinely cater to user needs.' },
          ].map(c => (
            <article key={c.n} className="p-7 border rounded-[24px]" style={{ borderColor: line, background: soft }}>
              <span className="block text-[44px] font-bold mb-[18px]" style={{ color: ink }}>{c.n}</span>
              <h3 className="text-[24px] font-bold mb-3" style={{ color: ink }}>{c.title}</h3>
              <p className="text-base leading-[1.72] m-0" style={{ color: muted }}>{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="py-24 px-[5vw] border-b flex justify-end" style={{ borderColor: line }}>
        <Link to="/viettel-digital" className="next-project-link" aria-label="Next project: Viettel Digital">
          <span className="next-project-eyebrow">
            <span>Next</span>
            <span className="next-project-arrow"><NextArrow /></span>
          </span>
          <span className="next-project-title">VIETTEL DIGITAL</span>
        </Link>
      </section>
    </>
  )
}
