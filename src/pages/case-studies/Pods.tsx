import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import TableOfContents from '../../components/TableOfContents'

const TOC = [
  { id: 'section-discovery', label: 'Discovery' },
  { id: 'section-ideate', label: 'Ideate' },
  { id: 'section-define', label: 'Define' },
  { id: 'section-design', label: 'Design' },
  { id: 'section-validate', label: 'ITERATE' },
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

function Split({ id, number, title, body }: { id?: string; number?: string; title: string; body?: string }) {
  return (
    <section id={id} className="grid gap-[clamp(32px,7vw,96px)] py-[112px] px-[5vw] border-b"
      style={{ gridTemplateColumns: '0.9fr 1fr', borderColor: line }}>
      <div>
        {number ? (<p className="text-[13px] tracking-[0.06em] uppercase mb-[14px] m-0" style={{ color: ink }}>{number}</p>) : null}
        <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] m-0" style={{ color: ink }}>{title}</h2>
      </div>
      {body ? (<p className="self-end max-w-[720px] text-base leading-[1.72] m-0" style={{ color: muted }}>{body}</p>) : <div />}
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

// ─── persona data ─────────────────────────────────────────────────────────────
const ITERATION_CASES = [
  {
    id: 'homepage',
    before: { src: '/assets/pods/homepage-v1.webp', alt: 'Homepage version 1' },
    after: { src: '/assets/pods/homepage-v2.webp', alt: 'Homepage version 2' },
    quotes: [
      `"I feel like I'd get really stressed out if I had to study every single day just to keep the streak going."`,
      `"I see this tool as a study helper, similar to ChatGPT or QuillBot, so adding this feature to the platform feels a bit unnecessary to me."`,
      `"I think I won't care about the streak feature."`,
    ],
  },
  {
    id: 'customization',
    before: { src: '/assets/pods/customization-v1.webp', alt: 'Customization version 1' },
    after: { src: '/assets/pods/customization-v2.webp', alt: 'Customization version 2' },
    quotes: [],
  },
]

const PERSONAS = [
  { src: '/assets/pods/persona-lily.webp', alt: 'Lily Ng — passionate PhD student persona', caption: 'Lily Ng — The passionate PhD Student, would like to minimize time in reading articles and doing her research' },
  { src: '/assets/pods/persona-edward.webp', alt: 'Edward White — tenure CS professor persona', caption: 'Edward White — That One Tenure CS Professor, likes to keep up with all the new breakthroughs' },
]

export default function Pods() {
  const persona = useCarousel(PERSONAS.length)
  const customizationIteration = ITERATION_CASES.find((pair) => pair.id === 'customization')

  return (
    <>
      <TableOfContents items={TOC} adaptiveContrast />

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
      <Split id="section-discovery" title="01. DISCOVERY"/>

      {/* Survey */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Survey</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Surveyed 50 students to validate the problem</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>We sent out a Google Form to 50 college, master's, and PhD students to gather data on their study difficulties and the platform features they wished existed.</p>
        </div>
        <img className="col-span-2 block mx-auto rounded-[12px]" style={{ width: '80%', marginTop: 56, background: bg }} src="/assets/Group 11621.webp" alt="Survey data line chart" />

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
      <Split id="section-ideate" title="02. IDEATE" />

      {/* Ideation */}
      <section className="grid items-start gap-10 py-[72px] px-[10%] pb-6" style={{ gridTemplateColumns: '1fr 1fr', background: bg }}>
        <Label>Ideation</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Considering between 12 ideas WAS a challenge!</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>Some outstanding ideas that our team has coming up with such as converting articles into comic-based formats or game-based learning with puzzle games.</p>
        </div>
        <img className="col-span-2 block w-full mx-auto mt-14 rounded-[12px]" style={{ maxWidth: 1100, background: soft }} src="/assets/pods/brainstorming.webp" alt="Brainstorming twelve actionable solutions" />
      </section>

      {/* Our solution */}
      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Our Solution</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Creating a platform that helps users convert different sources into audio-based podcasts.</span>
        </p>
      </section>

      {/* 03 Define */}
      <Split id="section-define" title="03. DEFINE" />

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

      {/* Vision */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Unique Selling Points</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>So… What makes our product stand out?</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>We empower users to create podcasts that truly feel their own with the assistance of AI.</p>
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

      {/* User flow */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>User Flow</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Inspired by Google NotebookLM, I came up with the user flow for the main page of Pods - Creating new Podcasts</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>I distilled the experience into four essential steps: upload sources, prompt the AI with additional context, fine-tune preferences, and generate.</p>
        </div>
        <img className="col-span-2 block w-full mt-14 rounded-[12px]" style={{ background: bg }} src="/assets/Group 301.webp" alt="Simplified 4-step user flow diagram" />
      </section>

      {/* IA */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Information Architecture</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Three main sections, designed for flow</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>Since “Existing Podcasts” and “Create new Podcasts” are the two main sections that users utilize within the app, our team decided to add a shortcut making the navigation process between those two pages becomes more seamlessly and easily. </p>
        </div>
        <img className="col-span-2 block w-full mt-14 rounded-[12px]" style={{ background: bg }} src="/assets/pods/information-architecture.webp" alt="Information architecture diagram" />
      </section>

      {/* 04 Design */}
      <Split id="section-design" title="04. DESIGN" />

      {/* Core screens */}
      {/* Core Screen 1 */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Four core screens shape the product</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            <span className="font-bold">#1 Home Dashboard</span> — an organized overview with pinned and recent items.</h2>
        </div>
        <div className="col-span-2 grid gap-x-0 gap-y-5 mt-5" style={{ alignItems: 'stretch' }}>
          <div className="flex items-center justify-end">
            <img
              src="/assets/homepage-v1.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <div className="flex items-center justify-start">
            <img
              src="/assets/homepage-v2.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <div className="col-span-2 flex justify-end mt-2">
            <div className="text-right" style={{ width: '80%', maxWidth: 1120 }}>
              <p className="text-[20.6px] leading-[30px] tracking-[-0.44px] m-0" style={{ color: muted }}>
                ↪ Design details on v.2
              </p>
            </div>
          </div>
          <img
            className="col-span-2 block mx-auto mt-5 rounded-[12px]"
            style={{ width: '80%', maxWidth: 1120, background: bg }}
            src="/assets/design-details-homepage.webp"
          />
        </div>
      </section>

      {/* Core Screen 2 */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Core screen #2</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            <span className="font-bold">#2 Create a New Pod</span> — input any source and get real-time recommendations.</h2>
        </div>
        <div className="col-span-2 grid gap-x-0 gap-y-5 mt-5" style={{ alignItems: 'stretch' }}>
          <div className="flex items-center justify-end">
            <img
              src="/assets/pod-creation-v1.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <div className="flex items-center justify-start">
            <img
              src="/assets/pod-creation-v2.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <img
            className="col-span-2 block mx-auto mt-5"
            style={{ width: '85%', maxWidth: 1120, background: bg }}
            src="/assets/pod-creation-design-detail.webp"
          />
        </div>
      </section>

      {/* Core Screen 3 */}
       <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Core screen #3</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            <span className="font-bold">#3 Customization</span> — granular inputs before generating results.</h2>
        </div>
        <div className="col-span-2 grid gap-x-0 gap-y-5 mt-5" style={{ alignItems: 'stretch' }}>
          <div className="flex items-center justify-end">
            <img
              src="/assets/customization-v1.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <div className="flex items-center justify-start">
            <img
              src="/assets/customization-v2.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <img
            className="col-span-2 block mx-auto mt-5"
            style={{ width: '85%', maxWidth: 1120, background: bg }}
            src="/assets/customization-detail.webp"
          />
        </div>
      </section>

      {/* Core Screen 4 */}
       <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Core screen #4</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            <span className="font-bold">#4 Latency</span> — AI progress with contextual flashcards while waiting.</h2>
        </div>
        <div className="col-span-2 grid gap-x-0 gap-y-5 mt-5" style={{ alignItems: 'stretch' }}>
          <div className="flex items-center justify-end">
            <img
              src="/assets/Latency 1.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <div className="flex items-center justify-start">
            <img
              src="/assets/Latency 2.webp"
              className="block w-full h-auto"
              style={{ width: '80%' }}
            />
          </div>
          <img
            className="col-span-2 block mx-auto mt-5"
            style={{ width: '85%', maxWidth: 1120, background: bg }}
            src="/assets/customization-detail.webp"
          />
        </div>

      </section>

      {/* 05 Iterate */}
      <Split id="section-validate" title="05. ITERATE" />

      {/* Iteration intro */}
      <section className="grid gap-10 py-[72px] px-[10%]" style={{ gridTemplateColumns: '1fr 1fr', background: bg }}>
        <Label>A/B Testing & Usability Testing</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Refined design decisions based on feedback</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] mb-5" style={{ color: muted }}>Testing between 2 versions was conducted both in-person and remotely over Zoom with mostly local Washington students.</p>
        </div>
        <div className="col-span-2 w-full flex justify-center py-10">
          <div className="w-full" style={{ maxWidth: 780 }}>
            {[
              { label: '— Feedback 1', title: 'Streak system felt stressful, not motivating', body: 'Students felt the streak mechanic added pressure instead of helping them build a sustainable learning routine.' },
            ].map(c => (
              <article
                key={c.label}
                className="p-7 border rounded-[24px]"
                style={{ borderColor: line, background: soft }}
              >
                <p
                  className="text-[13px] tracking-[0.06em] uppercase mb-[14px] m-0"
                  style={{ color: ink }}
                >
                  {c.label}
                </p>
                <h3 className="text-[24px] font-bold mb-3" style={{ color: ink }}>
                  {c.title}
                </h3>
                <p className="text-base leading-[1.72] m-0" style={{ color: muted }}>
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Iteration comparisons */}
      <section className="pb-[120px] px-[10%] border-b" style={{ borderColor: line, background: bg }}>
        <div className="mx-auto flex flex-col gap-[clamp(44px,7vw,92px)]" style={{ width: '100%', maxWidth: 1400 }}>
          {ITERATION_CASES.filter((pair) => pair.id !== 'customization').map((pair) => (
            <div
              key={pair.id}
              className="grid items-center gap-[clamp(32px,4vw,64px)]"
              style={{ gridTemplateColumns: pair.quotes.length ? 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))' : '1fr' }}
            >
              {pair.quotes.length ? (
                <div className="pt-3 flex flex-col gap-[clamp(34px,4vw,52px)]">
                  {pair.quotes.map((quote) => (
                    <p key={quote} className="text-[clamp(18px,2vw,20px)] leading-[1.45] tracking-[-0.03em] italic m-0 max-w-[560px]" style={{ color: muted }}>
                      {quote}
                    </p>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-col gap-[clamp(30px,3.5vw,44px)]">
                {[
                  { label: 'Version 1', src: pair.before.src, alt: pair.before.alt, active: false },
                  { label: 'Version 2', src: pair.after.src, alt: pair.after.alt, active: true },
                ].map((version) => (
                  <div key={version.label} className="grid items-center gap-6" style={{ gridTemplateColumns: 'clamp(120px, 14vw, 160px) minmax(0, 1fr)' }}>
                    <div className="flex flex-col items-start gap-4 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[clamp(20px,1.8vw,28px)] leading-none tracking-[-0.03em]" style={{ color: muted }}>↪</span>
                        <span className="text-[clamp(18px,1.8vw,28px)] font-semibold leading-[1.1] tracking-[-0.03em]" style={{ color: muted }}>{version.label}</span>
                      </div>
                      <span className="block rounded-full" style={{ width: 30, height: 30, background: version.active ? '#d7b9ff' : '#7b7b7b', position: 'relative' }}>
                        {version.active ? (
                          <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#141414', fontSize: 25, fontWeight: 700, lineHeight: 1 }}>✓</span>
                        ) : null}
                      </span>
                    </div>
                    <img src={version.src} alt={version.alt} className="w-full block rounded-[14px]" style={{ background: '#f7f7f7', boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {customizationIteration ? (
            <div className="flex flex-col gap-[clamp(44px,7vw,92px)]">
              <div className="w-full flex justify-center">
                <article
                  className="w-full p-7 border rounded-[24px]"
                  style={{ maxWidth: 780, borderColor: line, background: soft }}
                >
                  <p
                    className="text-[13px] tracking-[0.06em] uppercase mb-[14px] m-0"
                    style={{ color: ink }}
                  >
                    — Feedback 2
                  </p>
                  <h3 className="text-[24px] font-bold mb-3" style={{ color: ink }}>
                    Customization felt too dense
                  </h3>
                  <p className="text-base leading-[1.72] m-0" style={{ color: muted }}>
                    The fine-tuning step introduced too many controls at once, making the experience harder to scan and use quickly.
                  </p>
                </article>
              </div>
              <div
                className="grid items-center gap-[clamp(32px,4vw,64px)]"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))' }}
              >
                <div className="pt-3 flex flex-col gap-[clamp(34px,4vw,52px)]">
                  <p className="text-[clamp(18px,2vw,20px)] leading-[1.45] tracking-[-0.03em] italic m-0 max-w-[560px]" style={{ color: muted }}>
                    "There are too many settings here. I would need more time to understand what each control changes before I can move forward."
                  </p>
                  <p className="text-[clamp(18px,2vw,20px)] leading-[1.45] tracking-[-0.03em] italic m-0 max-w-[560px]" style={{ color: muted }}>
                    "I like having options, but this screen feels heavy when I just want to create the podcast quickly."
                  </p>
                </div>
                <div className="flex flex-col gap-[clamp(30px,3.5vw,44px)]">
                  {[
                    { label: 'Version 1', src: customizationIteration.before.src, alt: customizationIteration.before.alt, active: false },
                    { label: 'Version 2', src: customizationIteration.after.src, alt: customizationIteration.after.alt, active: true },
                  ].map((version) => (
                    <div key={version.label} className="grid items-center gap-6" style={{ gridTemplateColumns: 'clamp(120px, 14vw, 160px) minmax(0, 1fr)' }}>
                      <div className="flex flex-col items-start gap-4 pt-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[clamp(20px,1.8vw,28px)] leading-none tracking-[-0.03em]" style={{ color: muted }}>↪</span>
                          <span className="text-[clamp(18px,1.8vw,28px)] font-semibold leading-[1.1] tracking-[-0.03em]" style={{ color: muted }}>{version.label}</span>
                        </div>
                        <span className="block rounded-full" style={{ width: 30, height: 30, background: version.active ? '#d7b9ff' : '#7b7b7b', position: 'relative' }}>
                          {version.active ? (
                            <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#141414', fontSize: 25, fontWeight: 700, lineHeight: 1 }}>✓</span>
                          ) : null}
                        </span>
                      </div>
                      <img src={version.src} alt={version.alt} className="w-full block rounded-[14px]" style={{ background: '#f7f7f7', boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
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
