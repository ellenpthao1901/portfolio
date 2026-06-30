import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import TableOfContents from '../../components/TableOfContents'

const TOC = [
  { id: 'section-discovery', label: 'Discovery' },
  { id: 'section-define', label: 'Define' },
  { id: 'section-personas', label: 'User Testing' },
  { id: 'section-ethics', label: 'Deliverables' },
]

const ink = '#ebebeb'
const muted = '#888888'
const meta = '#999999'
const line = '#2a2a2a'
const soft = '#1a1a1a'
const bg = '#141414'

function NextArrow() {
  return (
    <svg viewBox="0 0 56 14" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="2" y1="7" x2="50" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="42,2 52,7 42,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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

const META_DETAILS = [
  { label: 'TIMELINE', value: 'January, 2026 — June, 2026' },
  { label: 'ROLE', value: 'UX Researcher (Contract)' },
  { label: 'TOOLS', value: 'Figma, Miro, Canva, Adobe Photoshop, Microsoft Excel' },
  { label: 'WITH', value: 'Christian Kaylan Alviz\nZakiyah Farooque\nMeiying Piao\nWilliam Wang' },
]

const BARRIERS = [
  {
    title: 'Digital Literacy',
    body: 'Text-heavy qualification content creates barriers for older adults and non-English speakers.',
    icon: <img src="/assets/digital_literacy.webp" alt="" className="block" style={{ width: 48, height: 48 }} aria-hidden="true" />,
  },
  {
    title: 'Lack of Awareness',
    body: 'Limited understanding of program benefits despite name recognition among some residents.',
    icon: <img src="/assets/lack-of-awareness.webp" alt="" className="block" style={{ width: 48, height: 48 }} aria-hidden="true" />,
  },
  {
    title: 'Trust',
    body: 'Skepticism about program legitimacy and concerns regarding data privacy discourage sign-ups.',
    icon: <img src="/assets/trust.webp" alt="" className="block" style={{ width: 48, height: 48 }} aria-hidden="true" />,
  },
  {
    title: 'Eligibility',
    body: 'Confusion about qualification requirements; many residents do not realize SNAP or Medicaid can automatically qualify them.',
    icon: <img src="/assets/eligibility.webp" alt="" className="block" style={{ width: 48, height: 48 }} aria-hidden="true" />,
  },
]

const NEXT_STEPS = [
  {
    n: '1.',
    title: 'There is a will, there is a way',
    body: 'First approach to interview was a challenge but by coming up with an alternative way, we have successfully conducted 8 in-person interviews with the target population.',
  },
  {
    n: '2.',
    title: 'User testing takes longer time than I expected',
    body: 'I will plan more time for user testing in the next project. I will also consider to conduct more remote testing sessions to save time and reach more participants.',
  },
  {
    n: '3.',
    title: 'Pay more attention to diversity',
    body: 'I will pay more attention to design assets that represent diverse population and conduct more interviews with diverse participants to get more insights.',
  },
]

const ETHICAL_CONSIDERATION_CARDS = [
  {
    title: 'Program Awareness',
    bullets: [
      'Accessible for people with low digital literacy.',
      'Clear and understandable information.',
      'Protect privacy and dignity.',
    ],
  },
  {
    title: 'Ethical Concerns',
    bullets: [
      'Resource information can sometimes overwhelm people.',
      'Risk of adding to existing information overload.'
    ],
  },
  {
    title: 'Design Decisions',
    bullets: [
      'Work with trusted community partners.',
      'Emphasize in-person outreach when possible.',
      'Use clear, jargon-free communication.',
    ],
  },
]

function EthicalConsiderationCard({
  title,
  bullets,
}: {
  title: string
  bullets: string[]
}) {
  return (
    <article className="mx-auto p-[clamp(32px,4vw,56px)] border rounded-[30px]" style={{ width: '510px', borderColor: line, background: soft }}>
      <h3 className="text-[30px] font-semibold tracking-[-0.06em] leading-[0.92] m-0 mb-8" style={{ color: '#167f91', textShadow: '0 0 10px rgba(255,255,255,0.18)' }}>
        {title}
      </h3>
      <div className="grid gap-5 max-w-[900px]">
        {bullets.map((bullet) => (
          <p key={bullet} className="text-[clamp(18px,1.45vw,24px)] leading-[1.52] tracking-[-0.03em] m-0" style={{ color: muted }}>
            {bullet}
          </p>
        ))}
      </div>
    </article>
  )
}

const SECONDARY_RESEARCH_STATS = [
  {
    value: '600,000+',
    body: 'economically challenged households in WA qualify for Lifeline services yet remain unconnected from the program.',
    source: 'Universal Service Administrative Co., 2025',
  },
  {
    value: '38%',
    body: 'of Washington state residents make less than the basic cost of living.',
    source: 'United for ALICE, 2025',
  },
  {
    value: '29%',
    body: 'of Kitsap County residents live rurally. Rural communities suffer the most from lacking reliable cell phone access.',
    source: 'Kitsap County Board of Commissioners, 2021\nNational Institute of Health, 2021',
  },
  {
    value: '2%',
    body: 'of Kitsap Transit riders lack reliable access to digital communication technologies.',
    source: 'Kitsap Transit, 2025',
  },
]

const PERSONAS = [
  {
    src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/ae20d4a0-8b72-4597-9a02-99d8953193f4/Screenshot+2026-04-15+at+4.53.31%E2%80%AFPM.png',
    alt: 'First Kitsap Transit persona',
    caption: 'Maria tries to stay connected to transportation information and work opportunities.',
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/508fef44-2fb7-47cd-ab76-57eff02075b2/Screenshot+2026-04-15+at+4.53.40%E2%80%AFPM.png',
    alt: 'Second Kitsap Transit persona',
    caption: 'Darnell lost phone access due to financial hardship and need clearer guidance to regain reliable communication access.',
  },
]

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.04em] uppercase leading-4 m-0" style={{ color: meta }}>
      {children}
    </p>
  )
}

function Split({ id, number, title, body }: { id?: string; number?: string; title: string; body?: string }) {
  return (
    <section
      id={id}
      className="grid gap-[clamp(32px,7vw,96px)] py-[112px] px-[5vw] border-b"
      style={{ gridTemplateColumns: '0.9fr 1fr', borderColor: line, background: bg }}
    >
      <div>
        {number ? (<p className="text-[13px] tracking-[0.06em] uppercase mb-[14px] m-0" style={{ color: ink }}>{number}</p>) : null}
        <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] m-0" style={{ color: ink }}>{title}</h2>
      </div>
      {body ? (<p className="self-end max-w-[720px] text-base leading-[1.72] m-0" style={{ color: muted }}>{body}</p>) : <div />}
    </section>
  )
}

function InfoCard({
  title,
  body,
  icon,
}: {
  title: string
  body: string
  icon?: React.ReactNode
}) {
  return (
    <article className="p-7 border rounded-[30px]" style={{ borderColor: line, background: soft }}>
      {icon ? (
        <div className="block mb-5" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3 className="text-[24px] font-semibold tracking-[-0.04em] m-0 mb-3" style={{ color: ink }}>{title}</h3>
      <p className="text-base leading-[1.7] m-0" style={{ color: muted }}>{body}</p>
    </article>
  )
}

function StatPanel({
  value,
  body,
  source,
}: {
  value: string
  body: string
  source: string
}) {
  return (
    <article className="p-8 border rounded-[24px] min-h-[250px] flex flex-col justify-between" style={{ borderColor: line, background: soft }}>
      <div>
        <p className="text-[40px] font-semibold tracking-[-0.06em] leading-[0.9] m-0" style={{ color: '#1f8aa5', marginBottom: 30 }}>
          {value}
        </p>
        <p className="text-[20.6px] leading-[1.45] tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>{body}</span>
        </p>
      </div>
      <p className="text-[15px] leading-[1.55] tracking-[-0.02em] whitespace-pre-line m-0 italic" style={{ color: meta }}>
        {source}
      </p>
    </article>
  )
}

export default function Kitsap() {
  const persona = useCarousel(PERSONAS.length)
  const ethicsCarousel = useCarousel(ETHICAL_CONSIDERATION_CARDS.length)

  return (
    <>
      <TableOfContents items={TOC} />

      <section
        className="grid border-b py-[60px] px-[10%]"
        style={{ minHeight: 238, gridTemplateColumns: 'minmax(320px,52.7vw) 1fr', alignItems: 'center', borderColor: line, background: bg }}
      >
        <div>
          <p className="text-[20.6px] leading-[30px] tracking-[-0.44px] m-0" style={{ color: ink }}>Lifeline Program Awareness Campaign</p>
          <p className="text-[20.6px] leading-[30px] tracking-[-0.44px] m-0" style={{ color: muted }}>UX Researcher • 2026</p>
        </div>
      </section>

      <section className="py-14 px-[10%] border-b" style={{ borderColor: line, background: '#000' }} aria-label="Project cover">
        <img
          src="/assets/kitsapcover2.webp"
          alt="Kitsap Transit Lifeline campaign collage"
          className="block w-full rounded-sm object-contain"
          style={{ maxHeight: '60vh' }}
        />
      </section>

      <section className="px-[10%] py-10 border-b" style={{ borderColor: line, background: bg }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm" style={{ color: meta }}>
          {META_DETAILS.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <span className="text-[11px] tracking-[0.08em] uppercase">{item.label}</span>
              <span className="text-[14px] leading-[1.5] whitespace-pre-line" style={{ color: ink }}>{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Client</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Kitsap Transit, </span>{' '}
          a public transportation agency in Washington State that provides commuter services to connect communities across Kitsap County.
        </p>
      </section>

      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Problem Scope</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Increasing awareness of Lifeline program, </span>{' '}
          a federal social benefits program providing reduced phone and internet services for qualifying low-income households.
        </p>
      </section>

      <Split
        id="section-discovery"
        title="01. Discovery"
      />

      <section className="grid gap-10 py-[72px] px-[5vw] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Secondary Research</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            First, we conducted literature review to establish a general knowledge of our population of interest
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            Over the course of 2 weeks, we conducted a literature review of <span style={{ color: ink }}>25+ articles and research papers. </span>{' '}Our research explored topics who lacks reliable connectivity or devices.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-10 pt-10">
          {SECONDARY_RESEARCH_STATS.map((stat) => (
            <StatPanel
              key={stat.value}
              value={stat.value}
              body={stat.body}
              source={stat.source}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>1-1 Interview</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            Reaching the right interviewees required trust and community connections
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            Through secondary stakeholders, we connected with individuals without reliable phone access and conducted 8 in-person interviews at the <span style={{ color: ink }}>Salvation Army Center.</span>{' '}
          </p>
        </div>
        <div className="col-span-2 pt-9">
          <img
            src="/assets/kitsap-interview-charts.webp"
            alt="Primary versus secondary stakeholder interviews and in-person versus online interview charts"
            className="block rounded-[18px] mx-auto"
            style={{ width: '88%', maxWidth: 1480, background: soft }}
          />
        </div>
      </section>

       <section className="grid gap-10 py-[84px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Real sharing from a secondary stakeholder</Label>
        <div className="flex flex-col gap-[22px]">
          <p className="font-serif text-5xl leading-none m-0" style={{ color: meta }}>"</p>
          <blockquote className="m-0 text-[20.6px] italic leading-8 tracking-[-0.44px]" style={{ color: ink }}>
            People I assisted with said that the Lifeline phones don't come with enough data. Some of them can’t even rely on it in emergencies to call 911, so they just end up tossing it.
          </blockquote>
          <p className="text-[14px] leading-5 tracking-[-0.28px] m-0" style={{ color: muted }}>— Anton Preisinger, Director of Northwest Hospitality</p>
        </div>
      </section>

      <Split
        id="section-define"
        title="02. Define"
      />

      <section className="grid gap-10 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Key Insights from the Interviews</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            Leveraging AI for data synthesis
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            We used <span style={{ color: ink }}>InsightSynth</span>{' '} - an AI summary tool to help us pull every interview notes together and identify the key patterns. Here are some key research insights:
          </p>
        </div>
        <img
          className="col-span-2 block mx-auto mt-5"
          style={{ width: '100%', maxWidth: 1120, background: bg }}
          src="/assets/Group 48095383.webp"
          alt="Four key research insights after interviews"
        />
      </section>

      <section className="grid gap-10 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>MAIN BARRIERS TO LIFELINE PROGRAM</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            Top 4 user pain points
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            Even though most of our interviewees have already heard of the Lifeline program, they still face barriers to understanding and enrolling in the program.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-10 pt-10">
          {BARRIERS.map((card) => (
            <InfoCard key={card.title} title={card.title} body={card.body} icon={card.icon} />
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>User Personas</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            Leveraging insights from the interviews, I crafted 2 personas, representing my targeted audiences. 
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            They are all middle-aged people who share a same pain point - not having a cell phone at the moment. As a result, their goal is to having a reliable mobile phone to either have a better access to transportation or applying for jobs.
          </p>
        </div>
        <div className="col-span-2 relative overflow-hidden" style={{ minHeight: 'clamp(350px,56vh,640px)', display: 'grid', alignItems: 'center' }}>
          {PERSONAS.map((p, i) => {
            const isActive = i === persona.index
            const isExiting = persona.exiting && i === persona.index
            const tx = persona.dir === 'prev' ? '-34px' : '34px'
            return (
              <div key={i} className="flex flex-col items-center justify-center gap-6 px-16 pb-[52px]" style={{ gridArea: '1 / 1', position: i === 0 ? 'relative' : 'absolute', inset: 0, opacity: isExiting ? 0 : isActive ? 1 : 0, transform: isExiting ? `translateX(${persona.dir === 'prev' ? '34px' : '-34px'}) scale(0.985)` : isActive ? 'translateX(0) scale(1)' : `translateX(${tx}) scale(0.985)`, transition: 'opacity 560ms ease, transform 560ms cubic-bezier(0.22,1,0.36,1)', visibility: isActive || isExiting ? 'visible' : 'hidden', pointerEvents: isActive ? 'auto' : 'none' }}>
                <img src={p.src} alt={p.alt} className="block w-full rounded-[18px]" style={{ maxWidth: 1180, background: soft }} />
                <p className="text-base leading-[26px] tracking-[-0.32px] text-center m-0 max-w-[860px]" style={{ color: muted }}>{p.caption}</p>
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

      <section className="grid gap-10 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Ethical Considerations</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            We defined these considerations to ensure solutions are accessible, respectful, and trustworthy.
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            To address this, we focused on working with trusted community partners, prioritizing in-person outreach when possible, and using clear, jargon-free communication.
          </p>
        </div>


        <div className="col-span-2 grid gap-[clamp(28px,4vw,56px)] mt-5" style={{ gridTemplateColumns: 'minmax(280px,0.78fr) minmax(420px,1fr)', alignItems: 'stretch' }}>
          <div className="flex items-center justify-center rounded-[30px]">
            <img
              src="/assets/ethical-icon-card.webp"
              alt="Ethical considerations illustration"
              className="block w-full h-auto"
              style={{ maxWidth: 250 }}
            />
          </div>

          <div className="relative overflow-visible px-[44px]" style={{ minHeight: 'clamp(360px,48vh,520px)', display: 'grid', alignItems: 'center' }}>
            {ETHICAL_CONSIDERATION_CARDS.map((group, i) => {
              const isActive = i === ethicsCarousel.index
              const isExiting = ethicsCarousel.exiting && i === ethicsCarousel.index
              const tx = ethicsCarousel.dir === 'prev' ? '-34px' : '34px'
              return (
                <div key={group.title} className="flex items-center justify-center pb-[40px]" style={{ gridArea: '1 / 1', position: i === 0 ? 'relative' : 'absolute', inset: 0, opacity: isExiting ? 0 : isActive ? 1 : 0, transform: isExiting ? `translateX(${ethicsCarousel.dir === 'prev' ? '34px' : '-34px'}) scale(0.985)` : isActive ? 'translateX(0) scale(1)' : `translateX(${tx}) scale(0.985)`, transition: 'opacity 560ms ease, transform 560ms cubic-bezier(0.22,1,0.36,1)', visibility: isActive || isExiting ? 'visible' : 'hidden', pointerEvents: isActive ? 'auto' : 'none' }}>
                  <EthicalConsiderationCard title={group.title} bullets={group.bullets} />
                </div>
              )
            })}
            <button onClick={ethicsCarousel.prev} disabled={ethicsCarousel.index === 0} className="absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 grid place-items-center rounded-full border-0 cursor-pointer p-0 transition-opacity" style={{ left: '-20px', background: 'rgba(38,38,38,0.85)', opacity: ethicsCarousel.index === 0 ? 0 : 1, pointerEvents: ethicsCarousel.index === 0 ? 'none' : 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" style={{ color: 'rgba(255,255,255,0.85)' }}><path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={ethicsCarousel.next} disabled={ethicsCarousel.index === ETHICAL_CONSIDERATION_CARDS.length - 1} className="absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 grid place-items-center rounded-full border-0 cursor-pointer p-0 transition-opacity" style={{ right: '-20px', background: 'rgba(38,38,38,0.85)', opacity: ethicsCarousel.index === ETHICAL_CONSIDERATION_CARDS.length - 1 ? 0 : 1, pointerEvents: ethicsCarousel.index === ETHICAL_CONSIDERATION_CARDS.length - 1 ? 'none' : 'auto', boxShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" style={{ color: 'rgba(255,255,255,0.85)' }}><path d="M9 5 L16 12 L9 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-2 z-10">
              {ETHICAL_CONSIDERATION_CARDS.map((_, i) => (
                <button key={i} onClick={() => ethicsCarousel.go(i, i < ethicsCarousel.index ? 'prev' : 'next')} className="w-2 h-2 rounded-full border-0 cursor-pointer p-0 transition-colors" style={{ background: i === ethicsCarousel.index ? ink : 'rgba(235,235,235,0.28)' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>HOW MIGHT WE</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            How might we design accessible solutions for Kitsap County residents without reliable cell phone access to help them better understand, trust, and enroll in the Lifeline program?
          </h2>
        </div>
      </section>

       <section className="grid gap-10 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <div className="col-span-2 grid grid-cols-2 gap-6 pt-10" style={{ width: '100%'}}>
        {[
          { label: '— Solution 1', title: 'Bus Posters', body: 'Physical awareness campaign designed for transit hubs and community spaces.', cta: 'See the Poster →', href: 'https://www.canva.com/design/DAHGHg-6BMw/_fLm7zbkSduMFtmCE7uWow/edit' },
          { label: '— Solution 2', title: 'Informational Lifeline Website', body: 'Centralized Lifeline resource hub with simplified eligibility and program information.', cta: 'See the Website →', href: 'https://dory-semicircle-72rd.squarespace.com/' },
        ].map(c => (
          <article key={c.label} className="p-7 border rounded-[24px] min-h-auto flex flex-col" style={{ borderColor: line, background: soft }}>
            <p className="text-[12px] tracking-[0.06em] uppercase mb-[14px]" style={{ color: ink }}>{c.label}</p>
            <h3 className="text-[24px] font-bold mb-3" style={{ color: ink }}>{c.title}</h3>
            <p className="text-[18px] leading-[1.72] m-0" style={{ color: muted }}>{c.body}</p>

          </article>
        ))}
      </div>

      </section>

      <Split
        id="section-personas"
        title="03. User Testing"
      />

      <section className="grid gap-10 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Poster Design - version beta 1</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            Exploring the first poster concepts
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            These posters focused on communicating the Lifeline program clearly and quickly. Each concept used a prominent QR code that directed users to a streamlined website with eligibility requirements and guidance on how to qualify.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-6 mt-5">
          {[
            { src: '/assets/kitsap-poster-2.webp', alt: 'Kitsap poster design beta version 2', label: 'Version 1' },
            { src: '/assets/kitsap-poster-3.webp', alt: 'Kitsap poster design beta version 3', label: 'Version 2' },
            { src: '/assets/kitsap-poster-4.webp', alt: 'Kitsap poster design beta version 4', label: 'Version 3' },
          ].map((poster) => (
            <div key={poster.src} className="grid gap-4">
              <img
                src={poster.src}
                alt={poster.alt}
                className="block w-full rounded-[12px]"
                style={{ background: bg }}
              />
              <p className="text-[16px] leading-[1.4] tracking-[-0.02em] text-center m-0" style={{ color: ink }}>
                {poster.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid items-start gap-15 pt-24 pb-[120px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>FEEDBACK - ROUND 1</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Valuable feedbacks for the posters</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>We conducted usability testing with 6 participations and received feedbacks with message clarity, URL visibility, QR-code trust, and the poster’s ability to communicate its story.</p>
        </div>
        <img
          className="col-span-2 block mx-auto mt-5 rounded-[12px]"
          style={{ width: '80%', maxWidth: 1120, background: bg }}
          src="/assets/USER TESTING - poster.webp"
          alt="Feedback from user testing of the poster design"
        />
      </section>

      <section className="grid items-start gap-15 pt-24 pb-[120px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>FEEDBACK - ROUND 2</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Valuable feedbacks for the website</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>Through cognitive walkthrough, users mentioned that the website effectively communicated the program's benefits, but they raised concerns about diversity and references.</p>
        </div>
        <img
          className="col-span-2 block mx-auto mt-5 rounded-[12px]"
          style={{ width: '100%', maxWidth: 1120, background: bg }}
          src="/assets/feedback - website.webp"
          alt="Feedback from user testing of the website design"
        />
      </section>

      <section className="grid items-start gap-15 pt-24 pb-[120px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>ITERATE - POSTER</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>We want everyone is easily accessible!</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>• Makes the QR code smaller + larger the URL </p>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>• Creates 2 versions targeting both primary + secondary stakeholders</p>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>• Incorporates illustration to better show the poster story </p>

        </div>
        <img
          className="col-span-2 block mx-auto mt-5"
          style={{ width: '100%', maxWidth: 1120, background: bg }}
          src="/assets/poster-final.webp"
          alt="Feedback from user testing of the website design"
        />
      </section>

      <Split
        id="section-ethics"
        title="04. Deliverables"
      />

       <section className="grid gap-10 pt-[50px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <div className="col-span-2 grid grid-cols-2 gap-6 pt-10" style={{ width: '100%'}}>
        {[
          { label: '— Solution 1', title: 'Bus Posters', body: 'Physical awareness campaign designed for transit hubs and community spaces.', cta: 'See the Poster →', href: 'https://www.canva.com/design/DAHGHg-6BMw/_fLm7zbkSduMFtmCE7uWow/edit' },
          { label: '— Solution 2', title: 'Informational Lifeline Website', body: 'Centralized Lifeline resource hub with simplified eligibility and program information.', cta: 'See the Website →', href: 'https://dory-semicircle-72rd.squarespace.com/' },
        ].map(c => (
          <article key={c.label} className="p-7 border rounded-[24px] min-h-auto flex flex-col" style={{ borderColor: line, background: soft }}>
            <p className="text-[12px] tracking-[0.06em] uppercase mb-[14px]" style={{ color: ink }}>{c.label}</p>
            <h3 className="text-[24px] font-bold mb-3" style={{ color: ink }}>{c.title}</h3>
            <p className="text-[18px] leading-[1.72] m-0" style={{ color: muted }}>{c.body}</p>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="mt-[25px] self-start min-w-[220px] rounded-full px-8 py-[18px] border text-[17px] font-normal tracking-[-0.03em] leading-none transition-all duration-300 text-center no-underline cursor-pointer"
              style={{
                color: 'rgba(255,255,255,0.82)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                borderColor: 'rgba(255,255,255,0.14)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), 0 10px 30px rgba(0,0,0,0.24)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color = '#ffffff'
                event.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)'
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.26)'
                event.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.24), 0 14px 34px rgba(0,0,0,0.28)'
                event.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = 'rgba(255,255,255,0.82)'
                event.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                event.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.16), 0 10px 30px rgba(0,0,0,0.24)'
                event.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {c.cta}
            </a>
          </article>
        ))}
      </div>
      </section>

      <section className="grid items-start gap-15 pt-24 pb-[120px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>FINAL VERSION OF POSTERS</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>By having many different versions, we want to make everyone feel included - either the person who's in need or those who know someones who is.</h2>
        </div>
        <img
          className="col-span-2 block mx-auto mt-5"
          style={{ width: '90%', maxWidth: 1120, background: bg }}
          src="/assets/poster-deliverables.webp"
          alt="Feedback from user testing of the website design"
        />
        <img
          className="col-span-2 block mx-auto mt-5"
          style={{ width: '90%', maxWidth: 1120, background: bg }}
          src="/assets/poster horizontal.webp"
          alt="Feedback from user testing of the website design"
        />
      </section>

      <section className="grid items-start gap-15 pt-24 pb-[120px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>FINAL VERSION OF THE WEBSITE</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Access important information in one place.</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>• Change wording to “How do I qualify?” for better clarification</p>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>• Add a “Get Started” section, explaining steps in details</p>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>• Include a table that outlines all phone plans with links</p>
        </div>
        <video
          className="col-span-2 block w-full mx-auto mt-5 rounded-[18px]"
          style={{ maxWidth: 1120, background: bg }}
          src="/assets/website-result.mp4"
          poster="/assets/website-result-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
      </section>

      <Split
        id="section-hmw"
        title="That's a wrap!"
      />

      <section className="grid grid-cols-2 gap-16 items-start px-[10%] py-20 border-b border-[#252525]">
        <div className="flex justify-center">
          <img
            className="col-span-2 block mx-auto mt-5"
            style={{ width: '90%', maxWidth: 1120, background: bg, borderRadius: 15 }}
            src="/assets/team-kitsap.MP.webp"
            alt="That is my Kitsap Transit team!"
          />
        </div>
        <div className="flex flex-col gap-5 pt-4 justify-center h-full">
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Huge shout out to my amazing team for working alongside me and making this 6-month capstone project a success!</h2>
        </div>
      </section>

      <section className="py-24 px-[5vw] border-b" style={{ borderColor: line, background: bg }}>
        <div className="max-w-[760px] mb-12">
          <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] tracking-[-0.04em] m-0 mb-5" style={{ color: ink }}>
            I learnt meaningful lessons
          </h2>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          {NEXT_STEPS.map((card) => (
            <article key={card.n} className="p-7 border rounded-[24px]" style={{ borderColor: line, background: soft }}>
              <p className="text-[24px] font-semibold tracking-[-0.04em] m-0 mb-5" style={{ color: ink }}>{card.n}</p>
              <h3 className="text-[22px] font-semibold tracking-[-0.03em] leading-[1.2] m-0 mb-3" style={{ color: ink }}>{card.title}</h3>
              <p className="text-base leading-[1.7] m-0" style={{ color: muted }}>{card.body}</p>
            </article>
          ))}
        </div>
      </section>
      
      <section className="py-24 px-[5vw] border-y flex justify-end" style={{ borderColor: line, background: bg }}>
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
