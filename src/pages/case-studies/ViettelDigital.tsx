import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import TableOfContents from '../../components/TableOfContents'

const TOC = [
  { id: 'section-discovery', label: 'Discovery' },
  { id: 'section-define', label: 'Define' },
  { id: 'section-prototype', label: 'Prototype' },
  { id: 'section-testing', label: 'User Testing' },
  { id: 'section-final', label: 'Final Design' },
]

// ─── Carousel ────────────────────────────────────────────────────────────────
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

// ─── Arrow SVG ───────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg viewBox="0 0 48 16" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="2" y1="8" x2="42" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <polyline points="34,2 44,8 34,14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const NextArrow = () => (
  <svg viewBox="0 0 56 14" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="2" y1="7" x2="50" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="42,2 52,7 42,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Color tokens ─────────────────────────────────────────────────────────────
const ink = '#ebebeb'
const muted = '#888888'
const meta = '#999999'
const line = '#2a2a2a'
const soft = '#1a1a1a'
const bg = '#141414'

// ─── Solution slides data ─────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    kicker: 'Solution 1',
    title: '"Quick Support Center" Feature',
    body: 'To enhance customer assistance, I designed a new Quick Support Center feature. This feature provides users with three primary support options:',
    list: [
      'Hotline support available daily from 7:00 AM to 10:00 PM',
      'Messaging support for more flexible communication',
      'Hotline access to car insurance support',
    ],
    footer: 'A comprehensive FAQ section also helps users quickly resolve common questions without contacting support directly.',
    images: [{ src: '/assets/solution-hotline.webp', alt: 'Quick support center feature preview' }],
    visualClass: 'items-center justify-center',
  },
  {
    kicker: 'Solution 2',
    title: 'Streamlined Transaction Page',
    body: 'To improve the transaction page experience, I structured information into clearly defined categories:',
    list: ['Car rental policies', 'Rental requirements', 'Important notices', 'Change and cancellation policies', 'Potential additional fees'],
    footer: 'Each category is presented in a dedicated section so users can locate relevant information quickly and understand key details with less effort.',
    images: [{ src: '/assets/solution-transaction.webp', alt: 'Streamlined transaction page preview' }],
    visualClass: 'items-center justify-center',
  },
  {
    kicker: 'Solution 3',
    title: 'Dual-layer Filtering System',
    body: 'The detailed filtering system includes a wide range of options such as car motion type, energy type, passenger capacity, brand, price range, and car type.',
    list: [],
    footer: 'This diverse selection empowers users to choose a vehicle that aligns with their preferences and specific requirements in different circumstances.',
    images: [
      { src: '/assets/solution-filter-default.webp', alt: 'Default detailed filter screen' },
      { src: '/assets/solution-filter-selected.webp', alt: 'Selected detailed filter screen' },
    ],
    visualClass: 'items-center justify-center gap-6',
  },
]

// ─── Section label ─────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.04em] uppercase leading-4 m-0" style={{ color: meta }}>
      {children}
    </p>
  )
}

// ─── Split section ─────────────────────────────────────────────────────────────
function Split({ id, number, title, body }: { id?: string; number: string; title: string; body: string }) {
  return (
    <section
      id={id}
      className="grid gap-[clamp(32px,7vw,96px)] py-[112px] px-[5vw] border-b"
      style={{ gridTemplateColumns: '0.9fr 1fr', borderColor: line }}
    >
      <div>
        <p className="text-[13px] tracking-[0.06em] uppercase mb-[14px]" style={{ color: ink }}>{number}</p>
        <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] m-0" style={{ color: ink }}>{title}</h2>
      </div>
      <p className="self-end max-w-[720px] text-base leading-[1.72]" style={{ color: muted }}>{body}</p>
    </section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ViettelDigital() {
  const carousel = useCarousel(SOLUTIONS.length)

  return (
    <>
      <TableOfContents items={TOC} />

      {/* Project intro */}
      <section
        className="grid border-b py-[60px] px-[10%]"
        style={{ minHeight: 238, gridTemplateColumns: 'minmax(320px,52.7vw) 1fr', alignItems: 'center', borderColor: line, background: bg }}
      >
        <div>
          <p className="text-[20.6px] leading-[30px] tracking-[-0.44px] m-0" style={{ color: ink }}>B2C Car Renting Mobile App</p>
          <p className="text-[20.6px] leading-[30px] tracking-[-0.44px] m-0" style={{ color: muted }}>Viettel Digital • Fin-tech App • 2024</p>
        </div>
      </section>

      {/* Demo video */}
      <section className="py-14 px-[10%] border-b" style={{ borderColor: line, background: '#000' }} aria-label="Project video">
        <video
          src="/assets/viettel-digital-hover.mov"
          autoPlay muted loop playsInline controls
          className="block w-full rounded-sm object-contain"
          style={{ maxHeight: '82vh' }}
        />
      </section>

      {/* Details */}
      <section
        className="grid gap-10 py-[70px] px-[10%] pb-20 border-b"
        style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}
      >
        <Label>Details</Label>
        <div className="border-t" style={{ borderColor: line }}>
          {[
            { label: 'YEAR', value: 'June — August 2024' },
            { label: 'TEAM', value: 'Viettel Money' },
            { label: 'ROLE', value: 'UX Design Intern' },
            { label: 'COLLABORATION', value: 'Product Manager\nSoftware Engineer\nBusiness Stakeholder\nUX Researcher' },
          ].map(r => (
            <div key={r.label} className="grid py-5 border-b" style={{ gridTemplateColumns: '190px 1fr', gap: 48, borderColor: line }}>
              <p className="text-[11px] tracking-[0.04em] uppercase leading-5 m-0" style={{ color: meta }}>{r.label}</p>
              <p className="text-[14px] leading-5 tracking-[-0.28px] m-0 whitespace-pre-line" style={{ color: ink }}>{r.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Overview</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Viettel Money is one of Vietnam's most influential fintech super apps.</span>{' '}
          From payments and banking to transportation and everyday services, its digital ecosystem serves nearly 20 million users, connects 1,000+ partners, and offers 300+ services nationwide.
        </p>
      </section>

      <section className="grid gap-10 py-28 px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Project Objectives</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
          <span style={{ color: ink }}>Increasing money flow within Viettel Money</span>{' '}
          by introducing a car-rental service that encouraged users to complete booking and transaction activities directly within the platform rather than relying on external payment providers.
        </p>
      </section>

      {/* 01 Discovery */}
      <Split id="section-discovery" number="01. DISCOVERY" title="Understand business objectives and product requirements" body="For me, thoroughly understanding the product requirements at the beginning is one of the most crucial parts of the design thinking process. It sets a clear direction, allowing me to deliver the best product quality for the business and users." />

      {/* Stakeholder quote */}
      <section className="grid gap-10 py-[84px] px-[10%] border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Understand the Stakeholder</Label>
        <div className="flex flex-col gap-[22px]">
          <p className="font-serif text-5xl leading-none m-0" style={{ color: meta }}>"</p>
          <blockquote className="m-0 text-[20.6px] italic leading-8 tracking-[-0.44px]" style={{ color: ink }}>
            Simple design that is accessible to all users including young and older users (up to 60 years old). Letting the users use the money that they have already transfered into Viettel Money instead of linking with other banks.
          </blockquote>
          <p className="text-[14px] leading-5 tracking-[-0.28px] m-0" style={{ color: muted }}>— Mr. Vu Dao, General Director of Viettel Digital</p>
        </div>
      </section>

      {/* Understand the market */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Understand the Market</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            Competitive analysis on a leading car-renting app in Vietnam - Momo
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            We conducted a SWOT Analysis to provide a comprehensive view of the subject's competitive positioning.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-[clamp(40px,5vw,80px)] pt-[59px]" style={{ justifyItems: 'center' }}>
          {[{ title: 'Pros', src: '/assets/pros.webp', alt: 'Pros of leading car-renting apps' }, { title: 'Cons', src: '/assets/cons.webp', alt: 'Cons of leading car-renting apps' }].map(item => (
            <article key={item.title} className="flex flex-col items-center gap-[42px] w-full">
              <h3 className="text-[36px] font-normal leading-[30px] tracking-[-0.44px] text-center m-0" style={{ color: ink }}>{item.title}</h3>
              <img src={item.src} alt={item.alt} className="w-full rounded-none" style={{ background: '#000' }} />
            </article>
          ))}
        </div>
      </section>

      {/* Understand the customer */}
      <section className="grid gap-10 pt-[92px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Understand the Customer</Label>
        <p className="text-[20.6px] leading-8 tracking-[-0.44px] self-start m-0" style={{ color: muted }}>
          Through interview with 3 types of targeted audiences, I gathered valid insights about their needs.
        </p>
        <img
          className="col-span-2 block mx-auto mt-5"
          style={{ width: '69%', maxWidth: 990 }}
          src="/assets/customer-interviews.webp"
          alt="Customer interview insights from three targeted audiences"
        />
      </section>

      {/* 02 Define */}
      <Split id="section-define" number="02. DEFINE" title={'Empathize and “listen” to user needs'} body="For me, thoroughly understanding the product requirements at the beginning is one of the most crucial parts of the design thinking process. It sets a clear direction, allowing me to deliver the best product quality for the business and users." />

      {/* Pain points intro */}
      <section className="grid gap-10 py-[72px] px-[10%] pb-6" style={{ gridTemplateColumns: '1fr 1fr', background: bg }}>
        <Label>User Pain Points</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>
            Utilized HMWs to open up the user pain points for capable approach for ideating solutions.
          </h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            Momo struggled to develop smooth and intuitive mobile applications, which lead to steep learning curves that affect customer retention and conversion.
          </p>
        </div>
      </section>

      {/* Pain points table */}
      <section className="grid gap-10 px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <div /> {/* empty left col */}
        <table className="w-full border-collapse border-t" style={{ borderColor: line, color: muted }}>
          <thead>
            <tr>
              <th className="text-[11px] font-normal tracking-[0.04em] uppercase text-left py-3 pb-2" style={{ color: meta, width: '42%', paddingRight: 56 }}>Pain Point</th>
              <th className="text-[11px] font-normal tracking-[0.04em] uppercase text-left py-3 pb-2" style={{ color: meta }}>How Might We</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                pain: <>Users struggle to <em className="not-italic" style={{ color: ink }}>get the assistance they need.</em></>,
                hmw: <>How might we enhance customer services so that <em className="not-italic" style={{ color: ink }}>users can be assisted in any situations</em>?</>,
              },
              {
                pain: <>Users feel overwhelmed by <em className="not-italic" style={{ color: ink }}>the amount of information on the transaction page.</em></>,
                hmw: <>How might we <em className="not-italic" style={{ color: ink }}>simplify and visually prioritize critical information on the transaction page</em> to help users avoid missing any terms?</>,
              },
              {
                pain: <>Users find it hard to select their preferred choices because of <em className="not-italic" style={{ color: ink }}>the app's unorganized filtering sections.</em></>,
                hmw: <>How might we redesign the <em className="not-italic" style={{ color: ink }}>filtering interface to be more organized</em> so users can quickly find vehicles that match their needs?</>,
              },
            ].map((row, i) => (
              <tr key={i} className="border-b" style={{ borderColor: line }}>
                <td className="py-[15px] text-[14px] leading-5 tracking-[-0.28px] align-top" style={{ paddingRight: 56 }}>{row.pain}</td>
                <td className="py-[15px] text-[14px] leading-5 tracking-[-0.28px] align-top">{row.hmw}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Key solutions + carousel */}
      <section className="grid gap-10 pt-16 px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Key Solutions</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>From Real Pain Points to Actionable Solutions</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            We ideated solutions through two design sprints and finalized 3 key-selling solutions for real-world users across all generations.
          </p>
        </div>

        {/* Carousel */}
        <div className="col-span-2 relative mt-16 overflow-hidden" style={{ minHeight: 430 }} aria-label="Key solutions carousel">
          {/* Prev button */}
          <button
            onClick={carousel.prev}
            disabled={carousel.index === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[35px] h-[35px] grid place-items-center rounded-full border-0 bg-transparent cursor-pointer p-0 transition-opacity"
            style={{ opacity: carousel.index === 0 ? 0 : 1, pointerEvents: carousel.index === 0 ? 'none' : 'auto' }}
            aria-label="Previous solution"
          >
            <img src="/assets/arrow-left.webp" alt="" className="w-full h-full block" />
          </button>

          {/* Slides */}
          {SOLUTIONS.map((s, i) => {
            const isActive = i === carousel.index
            const isExiting = carousel.exiting && i === carousel.index
            let tx = '34px'
            if (carousel.dir === 'prev') tx = '-34px'
            return (
              <div
                key={i}
                className="grid items-center gap-[clamp(21px,3.3vw,53px)] px-16 pb-[52px] pt-4"
                style={{
                  gridArea: '1 / 1',
                  gridTemplateColumns: 'minmax(0,1fr) minmax(360px,0.9fr)',
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  opacity: isExiting ? 0 : isActive ? 1 : 0,
                  transform: isExiting
                    ? `translateX(${carousel.dir === 'prev' ? '34px' : '-34px'}) scale(0.985)`
                    : isActive ? 'translateX(0) scale(1)' : `translateX(${tx}) scale(0.985)`,
                  transition: 'opacity 560ms ease, transform 560ms cubic-bezier(0.22,1,0.36,1)',
                  visibility: isActive || isExiting ? 'visible' : 'hidden',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Visual */}
                <div className={`flex min-h-[350px] ${s.visualClass}`}>
                  {s.images.map(img => (
                    <img key={img.src} src={img.src} alt={img.alt} className="block max-w-full object-contain" style={{ maxHeight: 400, width: s.images.length > 1 ? 'min(46%, 174px)' : undefined }} />
                  ))}
                </div>
                {/* Copy */}
                <div style={{ maxWidth: 440 }}>
                  <p className="text-[14px] font-semibold tracking-[0.02em] uppercase mb-[22px] m-0" style={{ color: meta }}>{s.kicker}</p>
                  <h3 className="text-[clamp(34px,3.6vw,56px)] font-medium leading-[0.98] tracking-[-1.2px] mb-9" style={{ color: '#f5f5f5' }}>{s.title}</h3>
                  <p className="text-[14px] leading-[21px] tracking-[-0.2px] m-0" style={{ color: ink }}>{s.body}</p>
                  {s.list.length > 0 && (
                    <ul className="mt-4 pl-[22px] m-0">
                      {s.list.map((item, j) => (
                        <li key={j} className="text-[14px] leading-[21px] tracking-[-0.2px] mt-[6px]" style={{ color: ink }}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {s.footer && <p className="text-[14px] leading-[21px] tracking-[-0.2px] mt-4 m-0" style={{ color: ink }}>{s.footer}</p>}
                </div>
              </div>
            )
          })}

          {/* Next button */}
          <button
            onClick={carousel.next}
            disabled={carousel.index === SOLUTIONS.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[35px] h-[35px] grid place-items-center rounded-full border-0 bg-transparent cursor-pointer p-0 transition-opacity"
            style={{ opacity: carousel.index === SOLUTIONS.length - 1 ? 0 : 1, pointerEvents: carousel.index === SOLUTIONS.length - 1 ? 'none' : 'auto' }}
            aria-label="Next solution"
          >
            <img src="/assets/arrow-right.webp" alt="" className="w-full h-full block" />
          </button>

          {/* Dots */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex gap-[5px]">
            {SOLUTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => carousel.go(i, i < carousel.index ? 'prev' : 'next')}
                className="w-2 h-2 rounded-full border-0 cursor-pointer p-0"
                style={{ background: i === carousel.index ? '#ffffff' : 'rgba(255,255,255,0.72)' }}
                aria-label={`Show solution ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 03 Prototype */}
      <Split id="section-prototype" number="03. PROTOTYPE" title="Design an intuitive mobile app experience" body="For me, thoroughly understanding the product requirements at the beginning is one of the most crucial parts of the design thinking process. It sets a clear direction, allowing me to deliver the best product quality for the business and users." />

      {/* User flow */}
      <section className="grid gap-10 pt-24 px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>User Flow</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>A seamless 5-step user flow</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            Inspired by the standard user flow that current car-renting platforms utilize right now, we has optimized the user flow to five steps and incorporated a driver license verification step for enhancing auditing.
          </p>
        </div>
        <img className="col-span-2 block w-full mt-9 rounded-sm" style={{ background: bg }} src="/assets/user-flow-dark.webp" alt="A seamless 5-step car renting user flow" />
      </section>

      {/* Wireframes */}
      <section className="grid gap-10 pt-[72px] px-[10%] pb-24 border-b" style={{ gridTemplateColumns: '1fr 1fr', borderColor: line, background: bg }}>
        <Label>Wireframe</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Wireframe</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>This is a version after the 6th iteration.</p>
        </div>
        {/* Gallery */}
        <div className="col-span-2 grid gap-[clamp(16px,2.5vw,36px)] mt-14" style={{ background: bg }}>
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-[clamp(22px,3vw,48px)] items-start">
            {[
              { title: 'Step 1: Choose location, pick-up, and drop-off date', src: '/assets/wireframe-home-v12.webp', alt: 'Wireframe home screen' },
              { title: '', src: '/assets/wireframe-choose-location.webp', alt: 'Wireframe choose destination' },
              { title: '', src: '/assets/wireframe-pickup-date.webp', alt: 'Wireframe pick-up date' },
              { title: '', src: '/assets/wireframe-dropoff-date.webp', alt: 'Wireframe drop-off date' },
            ].map((item, i) => (
              <figure key={i} className="m-0 flex flex-col gap-[9px] items-center w-full max-w-[230px] mx-auto">
                <p className="w-full text-left text-base leading-[1.72] tracking-[-0.44px] m-0" style={{ color: muted, minHeight: 55, whiteSpace: i === 0 ? 'nowrap' : undefined }}>{item.title}</p>
                <img src={item.src} alt={item.alt} className="w-full max-w-[230px] block rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.38)]" style={{ background: '#fff' }} />
              </figure>
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-5 gap-[clamp(22px,3vw,48px)] items-start">
            {[
              { title: 'Step 2: Choose the car', src: '/assets/wireframe-car-list.webp', alt: 'Wireframe car list' },
              { title: 'Step 3: Confirm the car', src: '/assets/wireframe-confirm-car.webp', alt: 'Wireframe car confirmation' },
              { title: 'Step 4: Fill in personal information', src: '/assets/wireframe-personal-info.webp', alt: 'Wireframe personal info' },
              { title: 'Step 5: Make a payment', src: '/assets/wireframe-payment-review.webp', alt: 'Wireframe payment' },
              { title: '', src: '/assets/wireframe-final-step.webp', alt: 'Wireframe payment success' },
            ].map((item, i) => (
              <figure key={i} className="m-0 flex flex-col gap-[9px] items-center w-full max-w-[230px] mx-auto">
                <p className="w-full text-left text-base leading-[1.72] tracking-[-0.44px] m-0" style={{ color: muted, minHeight: 55 }}>{item.title}</p>
                <img src={item.src} alt={item.alt} className="w-full max-w-[230px] block rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.38)]" style={{ background: '#fff' }} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Testing */}
      <section
        id="section-testing"
        className="grid gap-[clamp(32px,7vw,96px)] py-[112px] px-[5vw]"
        style={{ gridTemplateColumns: '0.9fr 1fr', borderColor: line }}
      >
        <div>
          <p className="text-[13px] tracking-[0.06em] uppercase mb-[14px]" style={{ color: ink }}>04. USER TESTING + ITERATION</p>
          <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] m-0" style={{ color: ink }}>Cognitive walkthrough and design improvements</h2>
        </div>
        <p className="self-end max-w-[720px] text-base leading-[1.72]" style={{ color: muted }}>
          I conducted cognitive walkthrough with 10 participants, assigning them two main tasks. Through this user testing, I identified design elements that caused friction in the user experience. Using these insights, I refined key app features to enhance usability and improve overall user satisfaction.
        </p>
      </section>

      {/* Task cards */}
      <div className="grid grid-cols-2 gap-6 pb-24 mx-auto" style={{ width: '69%', maxWidth: 990 }}>
        {[
          { label: '— Task 1', title: 'Rent an electric car priced above 1 million VND', body: '90% of users achieved the right result. 70% associated the correct action with the effect they were trying to achieve, while 30% missed the filtering options.' },
          { label: '— Task 2', title: 'Change renting date in the middle of the process', body: '60% of users achieved the right result. Several participants expected to adjust the date directly from Step 3 instead of returning to earlier steps.' },
        ].map(c => (
          <article key={c.label} className="p-7 border rounded-[24px]" style={{ borderColor: line, background: soft }}>
            <p className="text-[13px] tracking-[0.06em] uppercase mb-[14px]" style={{ color: ink }}>{c.label}</p>
            <h3 className="text-[24px] font-bold mb-3" style={{ color: ink }}>{c.title}</h3>
            <p className="text-base leading-[1.72] m-0" style={{ color: muted }}>{c.body}</p>
          </article>
        ))}
      </div>

      {/* Testing photos */}
      <div
        className="grid grid-cols-2 gap-6 relative pb-24 mx-auto"
        style={{ width: '69%', maxWidth: 990, marginTop: -72 }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-px" style={{ width: '100vw', background: line }} />
        {[
          { src: '/assets/testing-photo-2.webp', alt: 'User testing session photo 2' },
          { src: '/assets/testing-photo-1.webp', alt: 'User testing session photo 1' },
        ].map(p => (
          <img key={p.src} src={p.src} alt={p.alt} className="w-full block rounded-[24px] object-cover" style={{ aspectRatio: '16/4.5' }} />
        ))}
      </div>

      {/* Iteration intro */}
      <section className="grid gap-10 py-[72px] px-[10%]" style={{ gridTemplateColumns: '1fr 1fr', background: bg }}>
        <Label>Iteration</Label>
        <div>
          <h2 className="text-[20.6px] font-normal leading-[30px] tracking-[-0.44px] mb-6" style={{ color: ink }}>Informed 2 design decisions based on customers' feedback</h2>
          <p className="text-[20.6px] leading-8 tracking-[-0.44px] m-0" style={{ color: muted }}>
            Synthesizing user feedbacks and their experiences within the app, I iterated my initial designs to help users go directly on their golden path. Here are my design improvements:
          </p>
        </div>
      </section>

      {/* Iteration comparisons */}
      <section
        className="relative grid gap-[clamp(40px,6vw,80px)] pb-[120px] mx-auto"
        style={{ gridTemplateColumns: '1fr 1fr', width: '75%', maxWidth: 1250 }}
        aria-label="Design iterations"
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-px" style={{ width: '100vw', background: line }} />
        {[
          {
            before: { src: '/assets/iteration-filter-before.webp', alt: 'Before: filter button hidden at the bottom' },
            after: { src: '/assets/iteration-filter-after.webp', alt: 'After: filter options surfaced at the top' },
            caption: 'Add Filter Options on the top and Rename "Sort By" to "Filter" for better clarity',
          },
          {
            before: { src: '/assets/iteration-date-before.webp', alt: 'Before: rental dates without quick edit' },
            after: { src: '/assets/iteration-date-after.webp', alt: 'After: calendar and edit icons added' },
            caption: 'Allow users to adjust rental date and location in Step 3 without having to go back to Step 1 or Step 2',
          },
        ].map((pair, i) => (
          <figure key={i} className="m-0">
            <div className="grid items-center gap-[clamp(16px,2.5vw,32px)]" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
              <img src={pair.before.src} alt={pair.before.alt} className="w-full block rounded-[24px] object-contain shadow-[0_8px_32px_rgba(0,0,0,0.38)] p-4" style={{ background: soft }} />
              <span className="flex items-center justify-center text-white" style={{ width: 'clamp(36px,4vw,56px)', height: 'clamp(12px,1.4vw,18px)' }}>
                <ArrowRight />
              </span>
              <img src={pair.after.src} alt={pair.after.alt} className="w-full block rounded-[24px] object-contain shadow-[0_8px_32px_rgba(0,0,0,0.38)] p-4" style={{ background: soft }} />
            </div>
          </figure>
        ))}
        <p className="text-base leading-[26px] tracking-[-0.32px] text-center mx-auto max-w-[720px] m-0" style={{ color: muted }}>Add Filter Options on the top and Rename "Sort By" to "Filter" for better clarity</p>
        <p className="text-base leading-[26px] tracking-[-0.32px] text-center mx-auto max-w-[720px] m-0" style={{ color: muted }}>Allow users to adjust rental date and location in Step 3 without having to go back to Step 1 or Step 2</p>
      </section>

      {/* 05 Final Design */}
      <Split id="section-final" number="05. FINAL DESIGN" title="Being mindful with UI design" body="Building on the existing design system of the Viettel Money app, I focused on creating a visually intuitive and user-friendly interface. My goal was to ensure accessibility for all users, including older adults, aligning with stakeholder requirements." />

      {/* Final galleries */}
      {[
        {
          label: 'APP LOADING & HOMEPAGE',
          images: [
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/ebbc2001-1001-460c-9b39-99059a2b822c/page+loading.webp', alt: 'App loading splash' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/359ec3f9-fc8e-4790-97f4-a80fbd40559a/Home-final.webp', alt: 'Car rental homepage' },
          ],
        },
        {
          label: 'CAR RENTING PROCESS',
          images: [
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/96a1e315-33e5-45aa-8ff4-1d52292f3b1a/So+cho+final.webp', alt: 'Car list results screen' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/53e001df-76ea-46fb-9531-655633b57672/filter-final1.webp', alt: 'Detailed filter screen' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/77918caf-4806-44e1-8d41-42a07ba7713d/Xa%CC%81c+nha%CC%A3%CC%82n+tho%CC%82ng+tin+thue%CC%82+xe111.webp', alt: 'Car rental confirmation' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/2bf91d1e-61fd-41bb-a166-3ed68d62c24f/%C4%90ie%CC%82%CC%80n+tho%CC%82ng+tin-final.webp', alt: 'Tenant information form' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/4d32d012-3a7a-40c5-8f19-595955c74ea3/Xa%CC%81c+thu%CC%9B%CC%A3c+OTP.webp', alt: 'OTP authentication screen' },
          ],
        },
        {
          label: 'TRANSACTION STATUS',
          images: [
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/5adb4ea6-a130-4f2d-b5bd-3f8ef963f10f/Giao+di%CC%A3ch+tha%CC%80nh+co%CC%82ng-final.webp', alt: 'Payment successful' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/7b276faf-d30d-478d-af43-98a495d23f2a/Giao+di%CC%A3ch+xu+ly.webp', alt: 'Payment in process' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/b2d2aab3-a3c0-4f92-b318-25f0fdc3d3cc/Giao+di%CC%A3ch+that+bai.webp', alt: 'Payment failed' },
          ],
        },
        {
          label: 'CAR RENTING MANAGEMENT & HOTLINE',
          images: [
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/be3a346e-ded7-4536-a7d2-89b9ac2bd1e8/Qua%CC%89n+ly%CC%81+thue%CC%82+xe-final.webp', alt: 'Car rental management' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/256a0aee-bcf0-4978-8b79-a25db3ea5d08/Chi+tie%CC%82%CC%81t+thue%CC%82+xe-FINAL.webp', alt: 'Rental booking detail' },
            { src: 'https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/e71e214d-651a-47ff-88d1-e171c8c1aeba/Ho%CC%82%CC%83+tro%CC%9B%CC%A3-final.webp', alt: 'Quick Support Center' },
          ],
        },
      ].map(gallery => (
        <section key={gallery.label} className="py-24 px-[5vw] border-b" style={{ borderColor: line, background: bg }}>
          <p className="text-[13px] tracking-[0.06em] uppercase text-center mb-0" style={{ color: ink }}>{gallery.label}</p>
          <div className="flex flex-wrap justify-center items-start gap-7 mt-[42px]">
            {gallery.images.map(img => (
              <img key={img.src} src={img.src} alt={img.alt} className="rounded-[24px]" style={{ width: 240, maxWidth: 240, background: soft }} />
            ))}
          </div>
        </section>
      ))}

      {/* Takeaways */}
      <section className="py-24 px-[5vw] border-b" style={{ borderColor: line }}>
        <h2 className="text-[clamp(32px,4vw,58px)] font-bold leading-[1.05] mb-6" style={{ color: ink }}>Key takeaways</h2>
        <p className="text-base leading-[1.72] mb-7" style={{ color: muted }}>
          Since this was my first internship project, I found myself truly enjoying the process of ideating, designing, and conducting user usability testing. Here are my 3 major takeaways:
        </p>
        <div className="grid grid-cols-3 gap-6 pt-9">
          {[
            { n: '1.', title: 'Communicate well with different teams', body: 'Learn how to communicate my design decisions clearly with Product Managers, Engineers, and other stakeholders.' },
            { n: '2.', title: 'Decisions need to be based on reality', body: 'I found out that instead of designing an app intuitively, my designs need to be based on what users truly wants and needs through user interview and usability testing.' },
            { n: '3.', title: 'Shortcuts accelerate user decision-making', body: 'Providing shortcuts to key actions without having to return to previous steps ensures a more flexible and streamlined experience.' },
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
        <Link to="/pods" className="next-project-link" aria-label="Next project: Pods">
          <span className="next-project-eyebrow">
            <span>Next</span>
            <span className="next-project-arrow">
              <NextArrow />
            </span>
          </span>
          <span className="next-project-title">PODS</span>
        </Link>
      </section>
    </>
  )
}
